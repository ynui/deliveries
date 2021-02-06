const Validator = require('../../Validator')
const Utils = require('../../Utils')

const paramsTypeMap = new Map([
    ['email', 'email'],
    ['password', 'password']
])

exports.validate = (req, res, next) => {
    let method = req.customData.method
    if (method) {
        let required = []
        let optional = []
        switch (method) {
            case 'login':
                required = ['email', 'password']
                break;
            case 'logout':
            case 'getUsers':
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