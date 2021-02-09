const Validator = require('../../Validator')
const Utils = require('../../Utils')

const paramsTypeMap = {
    email: 'email',
    password: 'password',
    phone: 'phone',
    firstName: 'string',
    lastName: 'string',
    gender: 'string',
    dateOfBirth: 'date'
}

exports.validate = (req, res, next) => {
    let method = req.customData.method
    if (!method) {
        next(Utils.createError('No req.method provided', 'no-validation-method'))
    }
    let required = []
    let optional = []
    switch (method) {
        case 'register':
            required = ['email', 'password', 'phone', 'firstName', 'lastName']
            optional = ['gender', 'dateOfBirth']
            break;
        case 'login':
            required = ['email', 'password']
            break;
        case 'update':
            optional = ['phone', 'firstName', 'lastName', 'gender', 'dateOfBirth']
            break;
        case 'get':
        case 'getAll':
        case 'delete':
        case 'logout':
            break;
    }
    let validation = Validator.validateRequest(req.body, paramsTypeMap, required, optional)
    if (!validation.valid) {
        next(Utils.createError(JSON.stringify(validation.errors), 'input-not-valid'))
    }
    else
        next()
}