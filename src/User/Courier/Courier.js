class Courier {
    constructor(data) {
        this.id = data.id
        this.type = data.type || 'courier'
        this.phone = data.phone
        this.email = data.email
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.gender = data.gender || null
        this.dateOfBirth = data.dateOfBirth || null
    }

    get data() {
        return JSON.parse(JSON.stringify(this))
    }
}

module.exports = Courier