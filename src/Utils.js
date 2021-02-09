const crypto = require('crypto');

const ENCRYPTION = 'sha1'


exports.createError = (message, code = null, status = null) => {
    let error = new Error(message);
    error.status = status
    error.code = code
    return error
}

exports.generateHashId = (input) => {
    return crypto.createHash(ENCRYPTION).update(JSON.stringify(input)).digest('hex')
}

exports.getRecomendedPrice = (dist) => {
    let price = 0
    if (dist <= 1)
        price = 20
    else if (dist <= 1.5)
        price = 22
    else if (dist <= 2)
        price = 25
    else if (dist <= 2.5)
        price = 27
    else if (dist <= 3)
        price = 30
    else
        price = 45
    return price
}

exports.removeTrailingSlash = (str) => {
    return str.replace(/\/+$/, '');
}