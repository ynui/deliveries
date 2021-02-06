exports.setReqMethod = (req, map) => {
    let resault = null
    let method = req.method
    switch (method) {
        case 'GET':
            resault = map.get(method)
            break;
        case 'POST':
            resault = map.get(method)
            break;
        case 'PUT':
            resault = map.get(method)
            break;
        case 'DELETE':
            resault = map.get(method)
            break;
    }
    req.customData.method = resault;
    return resault
}