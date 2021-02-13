const baseURL = "http://localhost:3000/restaurant/cneCeMEL5UfFwMu6NYzm2zhbMMn1/"
// const baseURL = "http://localhost:3000/"
function getQuote() {
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
    console.log(data)
}