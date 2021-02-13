const { firebase, admin } = require('../../../firebase/fbConfig');
const Restaurant = require('./Restaurant')
const DB = require('../../DB')
const UserUtils = require('../User/UserUtils')
const Utils = require('../../Utils')
const Geo = require('../../Geocoding/geocode')

const COLLECTION_RESTAURANT_DETAILS = 'restaurantDetails'


exports.register = async (data) => {
    let newUser = null;
    let firebaseUser = null
    try {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(async (registered) => {
                data.id = registered.user.uid
                firebaseUser = registered.user
                newUser = new Restaurant(data)
            })
            .then(async () => {
                await UserUtils.saveUserToDB(newUser)
            })
            .then(async () => {
                await UserUtils.sendVerificationEmail(firebaseUser)
            })
            .catch((error) => {
                throw error
            })
    } catch (error) {
        if (firebaseUser)
            await UserUtils.deleteUser(newUser.id)
        throw error
    }
    return newUser
}

exports.login = async (email, password) => {
    let result = null
    try {
        result = await UserUtils.login(email, password, 'restaurant')
    } catch (error) {
        throw error
    }
    return result
}

exports.logout = async () => {
    let result = null
    try {
        result = await UserUtils.logout()
    } catch (error) {
        throw error
    }
    return result
}

exports.getAllRestaurants = async () => {
    let restaurants = []
    try {
        restaurants = await DB.getCollection(COLLECTION_RESTAURANT_DETAILS)
    } catch (error) {
        throw error
    }
    return restaurants
}

exports.getRestaurant = async (id) => {
    let restaurant = null
    try {
        restaurant = await DB.getDocument(COLLECTION_RESTAURANT_DETAILS, id)
    } catch (error) {
        throw error
    }
    return restaurant
}

exports.updateProfile = async (id, data) => {
    let restaurant = null;
    try {
        await DB.updateDocument(COLLECTION_RESTAURANT_DETAILS, id, data)
            .then(async (result) => {
                if (result)
                    restaurant = await this.getRestaurant(id)
            }).catch((error) => {
                throw error
            })
    } catch (error) {
        throw error
    }
    return restaurant
}

exports.getQuote = async (restaurantId, data) => {
    let result = null;
    let restaurant = null;
    try {
        restaurant = await this.getRestaurant(restaurantId)
        let distance = await Geo.distance(restaurant.address.geometry, { longitude: data.longitude, latitude: data.latitude })
        result = {
            restaurant,
            distance,
            address: data.address || null,
            recommendedPrice: Utils.getRecomendedPrice(distance)
        }
    } catch (error) {
        throw error
    }
    return result
}