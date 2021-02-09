class Restaurant {
    constructor(data) {
        this.id = data.id
        this.type = data.type || 'restaurant'
        this.phone = data.phone
        this.email = data.email
        this.name = data.name
        this.address = data.address
        this.latlng = data.latlng
        this.description = data.description || null
    }

    get data() {
        return JSON.parse(JSON.stringify(this))
    }
}

module.exports = Restaurant