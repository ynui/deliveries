exports.containsAllRequired = (reqData, required) => {
    let resault = { valid: false, error: [] }
    for (var field of required) {
        let validatingValue = reqData[field]
        if (validatingValue === typeof undefined || validatingValue === null) {
            resault.error.push(`Field ${field} is required`)
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
            resault.error.push(`Field ${field} is unnecessary`)
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
            if (!isFieldTypeMatch(map.get(field), validatingValue))
                resault.error.push(`Field ${field} must be of type "${map.get(field)}"`)
        }
    if (resault.error.length === 0)
        resault.valid = true
    return resault
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