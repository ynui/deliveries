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
    let price = 20
    let seperatedDist = dist.toString().split('.')
    let full = seperatedDist[0]
    let part = seperatedDist[1]
    if (dist > 1) {
        if (full > 1)
            price += 5 * (full - 1)
        if (part[0] < 2)
            price += 1
        else if (part[0] < 4)
            price += 2
        else if (part[0] < 6)
            price += 3
        else if (part[0] < 8)
            price += 4
        else
            price += 5
    }
    return price
}

exports.removeTrailingSlash = (str) => {
    return str.replace(/\/+$/, '');
}