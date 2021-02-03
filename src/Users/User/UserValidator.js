const Validator = require('../../Validator')
const Utils = require('../../Utils')

const paramsTypeMap = new Map()

exports.validate = (req, res, next) => {
    let method = req.customData.method
    if (method) {
        let required = []
        let optional = []
        switch (method) {
            case 'getUsers':
                break;
        }
        let containsAllRequired = Validator.containsAllRequired(req.body, required)
        let containsOnlyNecessary = Validator.containsOnlyNecessary(req.body, required.concat(optional))
        let fieldTypeMatch = Validator.fieldTypeMatch(req.body, paramsTypeMap)
        if (!containsAllRequired.valid || !fieldTypeMatch.valid || !containsOnlyNecessary.valid) {
            let errMsg = containsAllRequired.error.concat(containsOnlyNecessary.error).concat(fieldTypeMatch.error)
            next(Utils.createError(errMsg, 'input-not-valid'))
        }
        else
            next()
    }
}