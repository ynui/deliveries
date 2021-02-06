const Validator = require('../../Validator')
const Utils = require('../../Utils')

const paramsTypeMap = new Map([
    ['email', 'email'],
    ['password', 'password'],
    ['phone', 'phone'],
    ['name', 'string'],
    ['address', 'string'],
    ['description', 'string']
])

exports.validate = (req, res, next) => {
    let method = req.customData.method
    if (method) {
        let required = []
        let optional = []
        switch (method) {
            case 'register':
                required = ['email', 'password', 'phone', 'name', 'address']
                optional = ['description']
                break;
            case 'login':
                required = ['email', 'password']
                break;
            case 'update':
                optional = ['phone', 'name', 'address', 'description']
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