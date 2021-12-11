const { matchedData, oneOf, check } = require('express-validator');

exports.createAddress = [
    check('user_id').notEmpty().isNumeric().exists(),
    check('country').notEmpty().matches(/^[aA-zZ]+$/).exists(),
    check('state').notEmpty().matches(/^[aA-zZ]+$/).exists(),
    check('city').notEmpty().matches(/^[aA-zZ]+$/).exists(),
    check('address').notEmpty().isString().exists(),
    check('zipCode').matches(/^\d{5}$/).exists(),
    (req,res,next) => {
        req.body = matchedData(req,{includeOptionals:false});
        next()
    }
]; 
exports.deleteAddress = [
    check('id').notEmpty().isNumeric()
]
exports.updateAddress = [
    check('id').notEmpty().withMessage("not empty").isNumeric().withMessage("isNumeric"),
    oneOf([
        check('fieldName').equals('country'),
        check('fieldName').equals('state'),
        check('fieldName').equals('city'),
        check('fieldName').equals('address'),
        check('fieldName').equals('zipCode'),

    ]),
    check('newData').notEmpty(),

]