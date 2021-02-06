exports.containsAllRequired = (reqData, required) => {
    let resault = { valid: false, error: [] }
    for (var field of required) {
        let validatingValue = reqData[field]
        if (typeof validatingValue === typeof undefined || validatingValue === null) {
            resault.error.push(`Required field missing: ${field}`)
        }
    }
    if (resault.error.length === 0)
        resault.valid = true
    return resault
}

exports.containsOnlyNecessary = (reqData, fields) => {
    let resault = { valid: false, error: [] }
    for (var field in reqData) {
        if (!fields.includes(field)) {
            resault.error.push(`Unrelated field found: ${field}`)
        }
    }
    if (resault.error.length === 0)
        resault.valid = true
    return resault
}

exports.fieldTypeMatch = (reqData, map) => {
    let resault = { valid: false, error: [] }
    if (reqData)
        for (var field in reqData) {
            let validatingValue = reqData[field]
            let mapValue = map.get(field)
            if (!isFieldTypeMatch(mapValue, validatingValue) && typeof mapValue !== typeof undefined)
                resault.error.push(`Field type mismatch: ${field} must be of type: ${mapValue}, received: ${validatingValue}`)
        }
    if (resault.error.length === 0)
        resault.valid = true
    return resault
}

exports.validateDataToWrite = (data) => {
    let resault = { valid: false, error: [] };
    if (data) {
        for (var field in data) {
            if (typeof (data[field]) === typeof undefined)
                resault.error.push(`Cannot write data: field: ${field} is undefined`)
        }
        resault.valid = true
    }
    return resault
}

exports.createErrorMsg = (...errors) => {
    let resault = []
    for (var err of errors) {
        if (err.length > 0) {
            resault = resault.concat(err)
        }
    }
    return resault.join(', ')
}

function isFieldTypeMatch(type, value, resault) {
    let valid = false
    switch (type) {
        case 'email':
            valid = isEmail(value)
            break;
        case 'password':
            valid = isPassword(value)
            break;
        case 'phone':
            valid = isPhone(value)
            break;
        case 'string':
            valid = isString(value)
            break;
        case 'date':
            valid = isDate(value)
            break;
        default:
            break;
    }
    return valid
}

const isEmail = (value) => {
    return true
}
const isPassword = (value) => {
    return true
}
const isPhone = (value) => {
    return value.toString().replace(/\D/g, "") === value.toString()
}
const isString = (value) => {
    return (typeof value === 'string' && value !== "")
}
const isDate = (value) => {
    return true
}