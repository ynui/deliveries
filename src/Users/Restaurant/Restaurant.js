class Restaurant {
    constructor(data) {
        this.id = data.id
        this.type = data.type || 'restaurant'
        this.phone = data.phone
        this.email = data.email
        this.name = data.name
        this.address = {
            name: data.address,
            geometry: data.geometry || null
        }
        this.description = data.description || null
    }

    get data() {
        return JSON.parse(JSON.stringify(this))
    }
}

module.exports = Restaurant