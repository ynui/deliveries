exports.validateRequest = (body, typeMap, required, optional) => {
    let resault = {
        valid: false,
        errors: null
    }
    let allRequired = containsAllRequired(body, required)
    let onlyNecessary = containsOnlyNecessary(body, required.concat(optional))
    let fieldsTypeMatch = fieldTypeMatch(body, typeMap)
    let isValid = allRequired.valid && onlyNecessary.valid && fieldsTypeMatch.valid
    if (isValid) {
        resault.valid = true
    } else {
        resault.errors = createValidationErrorMsg(allRequired.error, onlyNecessary.error, fieldsTypeMatch.error)
        resault.valid = false
    }
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

const containsAllRequired = (reqData, required) => {
    let resault = { valid: false, error: [] }
    for (var field of required) {
        let validatingValue = reqData[field]
        if (typeof validatingValue === typeof undefined || validatingValue === null) {
            resault.error.push(field)
        }
    }
    if (resault.error.length === 0)
        resault.valid = true
    return resault
}

const containsOnlyNecessary = (reqData, fields) => {
    let resault = { valid: false, error: [] }
    for (var field in reqData) {
        if (!fields.includes(field)) {
            resault.error.push(field)
        }
    }
    if (resault.error.length === 0)
        resault.valid = true
    return resault
}

const fieldTypeMatch = (reqData, map) => {
    let resault = { valid: false, error: [] }
    if (reqData)
        for (var field in reqData) {
            let validatingValue = reqData[field]
            let mapValue = map[field]
            if (!isFieldTypeMatch(mapValue, validatingValue) && typeof mapValue !== typeof undefined)
                resault.error.push(`${field} must be of type: ${mapValue}, received: ${validatingValue}`)
        }
    if (resault.error.length === 0)
        resault.valid = true
    return resault
}

const createValidationErrorMsg = (allRequired, onlyNecessary, typeMissmatch) => {
    let errObj = {}
    if (allRequired.length > 0)
        errObj.RequiredMissing = allRequired
    if (onlyNecessary.length > 0)
        errObj.UnrelatedFields = onlyNecessary
    if (typeMissmatch.length > 0)
        errObj.TypeMissmatch = typeMissmatch
    return errObj
}

const isFieldTypeMatch = (type, value, resault) => {
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