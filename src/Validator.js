exports.validateRequest = (body, typeMap, required, optional) => {
    let result = {
        valid: false,
        errors: null
    }
    let allRequired = containsAllRequired(body, required)
    let onlyNecessary = containsOnlyNecessary(body, required.concat(optional))
    let fieldsTypeMatch = fieldTypeMatch(body, typeMap)
    let isValid = allRequired.valid && onlyNecessary.valid && fieldsTypeMatch.valid
    if (isValid) {
        result.valid = true
    } else {
        result.errors = createValidationErrorMsg(allRequired.error, onlyNecessary.error, fieldsTypeMatch.error)
        result.valid = false
    }
    return result
}

exports.validateDataToWrite = (data) => {
    let result = { valid: false, error: [] };
    if (data) {
        for (var field in data) {
            if (typeof (data[field]) === typeof undefined)
                result.error.push(`Cannot write data: field: ${field} is undefined`)
        }
        result.valid = true
    }
    return result
}

const containsAllRequired = (reqData, required) => {
    let result = { valid: false, error: [] }
    for (var field of required) {
        let validatingValue = reqData[field]
        if (typeof validatingValue === typeof undefined || validatingValue === null) {
            result.error.push(field)
        }
    }
    if (result.error.length === 0)
        result.valid = true
    return result
}

const containsOnlyNecessary = (reqData, fields) => {
    let result = { valid: false, error: [] }
    for (var field in reqData) {
        if (!fields.includes(field)) {
            result.error.push(field)
        }
    }
    if (result.error.length === 0)
        result.valid = true
    return result
}

const fieldTypeMatch = (reqData, map) => {
    let result = { valid: false, error: [] }
    if (reqData)
        for (var field in reqData) {
            let validatingValue = reqData[field]
            let mapValue = map[field]
            if (!isFieldTypeMatch(mapValue, validatingValue) && typeof mapValue !== typeof undefined)
                result.error.push(`${field} must be of type: ${mapValue}, received: ${validatingValue}`)
        }
    if (result.error.length === 0)
        result.valid = true
    return result
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

const isFieldTypeMatch = (type, value, result) => {
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