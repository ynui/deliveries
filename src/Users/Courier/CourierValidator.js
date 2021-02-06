const Validator = require('../../Validator')
const Utils = require('../../Utils')

const paramsTypeMap = new Map([
    ['email', 'email'],
    ['password', 'password'],
    ['phone', 'phone'],
    ['firstName', 'string'],
    ['lastName', 'string'],
    ['gender', 'string'],
    ['dateOfBirth', 'date']
])

exports.validate = (req, res, next) => {
    let method = req.customData.method
    if (method) {
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
        let containsAllRequired = Validator.containsAllRequired(req.body, required)
        let containsOnlyNecessary = Validator.containsOnlyNecessary(req.body, required.concat(optional))
        let fieldTypeMatch = Validator.fieldTypeMatch(req.body, paramsTypeMap)
        if (!containsAllRequired.valid || !fieldTypeMatch.valid || !containsOnlyNecessary.valid) {
            let errMsg = Validator.createErrorMsg(containsAllRequired.error, containsOnlyNecessary.error, fieldTypeMatch.error)
            next(Utils.createError(errMsg, 'input-not-valid'))
        }
        else
            next()
    }
    next(Utils.createError('No req.method provided', 'no-validation-method'))
}