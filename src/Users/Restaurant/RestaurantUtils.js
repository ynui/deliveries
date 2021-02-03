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

exports.getRestaurants = async () => {
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
    return restaurants
}