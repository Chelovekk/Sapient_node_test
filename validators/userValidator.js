const { matchedData, oneOf, check } = require('express-validator');

exports.createUser = [
    check('firstname').notEmpty().isString(),
    check('lastname').notEmpty().isString(),
    check('phoneNumber').notEmpty().matches(/\(?([0-9]{3})\)([ -]?)([0-9]{3})\2([0-9]{4})/),
    check('birthday').matches(/^\d{1,2}([./])\d{1,2}([./])\d{4}$/),

    (req,res,next)=>{
        req.body = matchedData(req,{includeOptionals:false})
        next();
    }

];

exports.updateUser = [
    check('id').notEmpty().isNumeric(),
    oneOf([
        check('fieldName').equals('lastname'),
        check('fieldName').equals('firstname'),
        check('fieldName').equals('phoneNumber'),
        check('fieldName').equals('birthday'),
    ]),
    check('newData').notEmpty(),
]
