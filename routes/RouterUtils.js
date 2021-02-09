exports.setReqMethod = (req, map) => {
    let resault = null
    let method = req.method
    switch (method) {
        case 'GET':
            resault = map.get
            break;
        case 'POST':
            resault = map.post
            break;
        case 'PUT':
            resault = map.put
            break;
        case 'DELETE':
            resault = map.delete
            break;
    }
    req.customData.method = resault;
    return resault
}