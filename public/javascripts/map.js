require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/widgets/Search",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/tasks/Locator",
    "esri/symbols/WebStyleSymbol"
],
    function (esriConfig, Map, SceneView, Search, Graphic, GraphicsLayer, Locator, WebStyleSymbol) {
        esriConfig.apiKey = "AAPKcfbf001c53a54450b63fcd2a18338a1dntqM2Y3-DsD1T4IvkTzxbTiD0jDQE18n4eP9C9QO65uFFCjWEEDJYoQm9WSlp2NK";

        let map = new Map({
            // basemap: "streets"
            basemap: "arcgis-navigation"
        });

        var view = new SceneView({
            center: [34.78, 32.08],
            scale: 30000,
            container: "viewDiv",
            map: map
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        let searchWidget = new Search({
            view: view
        });

        const locatorTask = new Locator({
            url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        })

        // Add the search widget to the top right corner of the view
        view.ui.add(searchWidget, {
            position: "top-right"
        });

        searchWidget.on('search-complete', searchWidgetHandler)
        view.on("click", mapClickHandler);

        async function mapClickHandler(event) {
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
            let resData = result.results[0].results[0]
            let geometry = resData.feature.geometry
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
            // const symbol = {
            //     type: "simple-marker",
            //     color: "blue",
            //     outline: {
            //         color: [255, 255, 255],
            //         width: 1
            //     }
            // };
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
