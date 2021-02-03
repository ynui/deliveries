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

function convertJsonIntToString(data) {
    for (var field in data) {
        if (typeof data[field] === 'number')
            data[field] = data[field].toString()
        if (typeof data[field] === 'object')
            data[field] = convertJsonIntToString(data[field])
    }
    return data
}

exports.removeTrailingSlash = (str) => {
    return str.replace(/\/+$/, '');
}