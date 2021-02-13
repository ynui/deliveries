exports.setReqMethod = (req, map) => {
    let result = null
    let method = req.method
    switch (method) {
        case 'GET':
            result = map.get
            break;
        case 'POST':
            result = map.post
            break;
        case 'PUT':
            result = map.put
            break;
        case 'DELETE':
            result = map.delete
            break;
    }
    req.customData.method = result;
    return result
}