const { firebase, admin } = require('../firebase/fbConfig');
const Utils = require('./Utils')
const validator = require('./Validator')

const db = admin.firestore()

async function writeToCollection(collection, document, data) {
    let success = false
    try {
        let validate = validator.validateDataToWrite(data)
        if (validate.error.length > 0)
            throw Utils.createError(validate.error, 'invalid-data-write')
        await db.collection(collection).doc(document).set(data)
        success = true
    } catch (error) {
        console.error(`${error}\n collection: ${collection} doc: ${document} data: ${data}`)
        throw error
    }
    return success
}

async function updateDocument(collection, document, data) {
    let success = false
    try {
        let validate = validator.validateDataToWrite(data)
        if (validate.error.length !== 0)
            throw Utils.createError(validate.error, 'invalid-data-write')
        await db.collection(collection).doc(document).update(data)
        success = true
    } catch (error) {
        console.error('Error updating ' + collection + document + data)
        throw error
    }
    return success
}

async function getDocument(collection, document) {
    let resault = null
    let docRef = db.collection(collection).doc(document)
    let doc = await docRef.get()
    if (doc.exists) resault = doc.data()
    return resault
}


async function getCollection(collection) {
    let resault = null
    try {
        let colRef = db.collection(collection)
        let col = await colRef.get()
        resault = col.docs.map(doc => doc.data())
    } catch (error) {
        throw error
    }
    return resault
}

async function deleteDocument(collection, document) {
    let resault = false
    try {
        let docRef = db.collection(collection).doc(document)
        await docRef.delete()
        resault = true
    } catch (error) {
        throw error
    }
    return resault
}

async function isDocAlreadyExists(collection, document) {
    let doc = getDocument(collection, document)
    return doc.exists()
}

module.exports = {
    writeToCollection,
    updateDocument,
    getDocument,
    getCollection,
    deleteDocument,
    isDocAlreadyExists
};