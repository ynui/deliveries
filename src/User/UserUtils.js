const { firebase, admin } = require('../../firebase/fbConfig');
const DB = require('../DB')

const COLLECTION_COURIER_DETAILS = 'courierDetails'
const COLLECTION_RESTAURANT_DETAILS = 'restaurantDetails'


exports.deleteUser = async (userId, type) => {
    let success = false
    try {
        await admin
            .auth()
            .deleteUser(userId)
            .then((user) => {
                console.log(`Successfully deleted user ${userId}`);
            })
            .catch((error) => {
                console.log(`Error deleting user ${userId} Error: ${error}`);
            });
        if (type === 'courier')
            await DB.deleteDocument(COLLECTION_COURIER_DETAILS, userId)
        else if (type === 'restaurant')
            await DB.deleteDocument(COLLECTION_RESTAURANT_DETAILS, userId)
        success = true//TODO: check if uid exists
    } catch (error) {
        throw error
    }
    return success
}

exports.saveUserToDB = async (user) => {
    let success = false
    try {
        if (user.type === 'courier')
            success = await DB.writeToCollection(COLLECTION_COURIER_DETAILS, user.id, user.data)
        else if (user.type === 'restaurant')
            success = await DB.writeToCollection(COLLECTION_RESTAURANT_DETAILS, user.id, user.data)
    } catch (error) {
        await UserUtils.deleteUser(user.id)
        throw error
    }
    return success
}

exports.sendVerificationEmail = (firebaseUser) => {
    try {
        firebaseUser.sendEmailVerification()
            .then(() => {
                console.log('Verification email sent to ' + firebaseUser.email)
            }).catch((error) => {
                throw error
            });
    }
    catch (error) {
        throw error
    }
}

exports.getAllUsers = async () => {
    let users = null
    await admin
        .auth()
        .listUsers()
        .then((res) => {
            users = res
        }).catch((error) => { throw error });
    return users
}