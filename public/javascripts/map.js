require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/widgets/Search",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/tasks/Locator",
    "esri/symbols/WebStyleSymbol",
    "esri/widgets/BasemapGallery",
    "esri/Basemap",
    "esri/widgets/Expand",
    "esri/widgets/Directions"
],
    function (
        esriConfig, Map, SceneView, Search, Graphic,
        GraphicsLayer, Locator, WebStyleSymbol, BasemapGallery,
        Basemap, Expand, Directions) {

        esriConfig.apiKey = "AAPKcfbf001c53a54450b63fcd2a18338a1dntqM2Y3-DsD1T4IvkTzxbTiD0jDQE18n4eP9C9QO65uFFCjWEEDJYoQm9WSlp2NK";

        let map = new Map({
            basemap: "streets"
            // basemap: "arcgis-navigation"
        });

        var view = new SceneView({
            center: [34.78, 32.08],
            scale: 30000,
            container: "viewDiv",
            map: map
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        const searchWidget = new Search({
            view: view,
            resultGraphicEnabled: false,
            popupEnabled: false
        });

        const locatorTask = new Locator({
            url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        })

        const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div"),
            source: [
                Basemap.fromId("streets"),
                Basemap.fromId("arcgis-navigation"),
                Basemap.fromId("arcgis-newspaper"),
                Basemap.fromId("arcgis-nova"),
                Basemap.fromId("satellite")
            ] // autocasts to LocalBasemapsSource
        });

        var directionsWidget = new Directions({
            view: view
        });

        var bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });

        var dirExpand = new Expand({
            view: view,
            content: directionsWidget
        });

        var searchExpand = new Expand({
            view: view,
            content: searchWidget,
            expanded: true
        });

        view.ui.add(searchExpand, {
            position: "top-right"
        });

        // view.ui.add(dirExpand, {
        //     position: "top-right"
        // });

        view.ui.add(bgExpand, {
            position: "top-right"
        });

        searchWidget.on('search-complete', searchWidgetHandler)
        view.on('click', mapClickHandler);

        async function mapClickHandler(event) {
            document.getElementById('deliverSummery').style.visibility = 'hidden'
            graphicsLayer.removeAll()
            let pointGraphic = createGraphic(event.mapPoint)
            graphicsLayer.add(pointGraphic);
            let address = await reverseGeocode(event.mapPoint)
            let obj = {
                longitude: event.mapPoint.longitude,
                latitude: event.mapPoint.latitude,
                address: address
            }
            setLocationDetails(obj)
        }

        function searchWidgetHandler(result) {
            document.getElementById('deliverSummery').style.visibility = 'hidden'
            let resData = result.results[0].results[0]
            let geometry = resData.feature.geometry
            graphicsLayer.removeAll()
            let pointGraphic = createGraphic(geometry)
            graphicsLayer.add(pointGraphic);
            let obj = {
                longitude: geometry.longitude,
                latitude: geometry.latitude,
                address: resData.name
            }
            setLocationDetails(obj)
        }


        function setLocationDetails(data) {
            document.getElementById('longitude').innerHTML = data.longitude
            document.getElementById('latitude').innerHTML = data.latitude
            document.getElementById('address').value = ""
            document.getElementById('address').placeholder = data.address || ""
        }


        function createGraphic(data) {
            const point = {
                type: "point",
                longitude: data.longitude,
                latitude: data.latitude
            };
            const symbol = {
                type: "web-style",
                name: "push-pin-2",
                styleName: "Esri2DPointSymbolsStyle"
            }
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: symbol
            });
            return pointGraphic
        }

        async function reverseGeocode(data) {
            let address = null
            try {
                await locatorTask.locationToAddress({ location: data })
                    .then(function (response) { // Show the address found
                        address = response.address;
                    }, function (err) { // Show no address found
                        console.error(err)
                    });
            } catch (error) {
                console.error(error)
            }
            return address
        }
    });
