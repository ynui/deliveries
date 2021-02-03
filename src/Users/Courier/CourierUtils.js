const { firebase, admin } = require('../../../firebase/fbConfig');
const Courier = require('./Courier')
const DB = require('../../DB')
const UserUtils = require('../User/UserUtils')

const COLLECTION_COURIER_DETAILS = 'courierDetails'


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
                newUser = new Courier(data)
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

exports.getCouriers = async () => {
    let couriers = []
    try {
        couriers = await DB.getCollection(COLLECTION_COURIER_DETAILS)
    } catch (error) {
        throw error
    }
    return couriers
}

exports.getCourier = async (id) => {
    let courier = null
    try {
        courier = await DB.getDocument(COLLECTION_COURIER_DETAILS, id)
    } catch (error) {
        throw error
    }
    return courier
}