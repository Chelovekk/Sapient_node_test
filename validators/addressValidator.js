const   { check } = require('express-validator/check');
const { matchedData } = require('express-validator');

exports.createAddress = [
    check('user_id').notEmpty().isNumeric().exists(),
    check('country').notEmpty().matches(/^[aA-zZ]+$/).exists(),
    check('state').notEmpty().matches(/^[aA-zZ]+$/).exists(),
    check('city').notEmpty().matches(/^[aA-zZ]+$/).exists(),
    check('address').notEmpty().isString().exists(),
    check('zipCode').matches(/\b\d{5}\b/g).exists(),
    (req,res,next) => {
        req.body = matchedData(req,{includeOptionals:false});
        next()
    }
]; 
exports.deleteAddress = [
    check('id').notEmpty().isNumeric()
]
exports.updateAddress = [
    check('id').notEmpty().isNumeric(),
    check('fieldName').notEmpty().equals('country'||'state'||'city'||'address'||'zipCode'),
    check('newData').notEmpty(),

]