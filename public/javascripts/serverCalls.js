const baseURL = "http://localhost:3000/restaurant/cneCeMEL5UfFwMu6NYzm2zhbMMn1/"
// const baseURL = "http://localhost:3000/"
function getQuote() {
    hideQuote()
    let url = "getQuote"
    let obj = {
        longitude: document.getElementById('longitude').innerHTML,
        latitude: document.getElementById('latitude').innerHTML,
        address: document.getElementById('address').value || document.getElementById('address').placeholder
    }
    $.ajax({
        type: "POST",
        url: baseURL + url,
        data: obj,
        success: getQuoteCallback,
        error: (error) => { console.error(error) }
    });
}

function getQuoteCallback(data) {
    document.getElementById('deliverSummery').style.visibility = 'visible'
    document.getElementById('from').innerHTML = data.restaurant.address.name
    document.getElementById('to').innerHTML = data.address
    document.getElementById('distance').innerHTML = data.distance
    document.getElementById('recommendedPrice').innerHTML = data.recommendedPrice
}

function hideQuote() {
    document.getElementById('deliverSummery').style.visibility = 'hidden'
}