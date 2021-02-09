const Validator = require('../../Validator')
const Utils = require('../../Utils')

const paramsTypeMap = {
    email: 'email',
    password: 'password'
}

exports.validate = (req, res, next) => {
    let method = req.customData.method
    if (!method) {
        next(Utils.createError('No req.method provided', 'no-validation-method'))
    }
    let required = []
    let optional = []
    switch (method) {
        case 'login':
            required = ['email', 'password']
            break;
        case 'logout':
        case 'get':
            break;
    }
    let validation = Validator.validateRequest(req.body, paramsTypeMap, required, optional)
    if (!validation.valid) {
        next(Utils.createError(JSON.stringify(validation.errors), 'input-not-valid'))
    }
    else
        next()
}