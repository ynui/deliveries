const { firebase, admin } = require('../../../firebase/fbConfig');
const Restaurant = require('./Restaurant')
const DB = require('../../DB')
const UserUtils = require('../User/UserUtils')

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
        if (newUser)
            await UserUtils.deleteUser(newUser.id)
        throw error
    }
    return newUser
}

exports.login = async (email, password) => {
    let resault = null
    try {
        resault = await UserUtils.login(email, password, 'restaurant')
    } catch (error) {
        throw error
    }
    return resault
}

exports.logout = async () => {
    let resault = null
    try {
        resault = await UserUtils.logout()
    } catch (error) {
        throw error
    }
    return resault
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
            .then(async (resault) => {
                if (resault)
                    restaurant = await this.getRestaurant(id)
            }).catch((error) => {
                throw error
            })
    } catch (error) {
        throw error
    }
    return restaurant
}