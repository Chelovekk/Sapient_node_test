const { matchedData, oneOf } = require('express-validator');
const { check } = require('express-validator/check');

exports.createUser = [
    check('firstname').notEmpty().isString(),
    check('lastname').notEmpty().isString(),
    check('phoneNumber').notEmpty().isNumeric(),
    check('birthday').custom(value=>{
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)){
            return false;
        } else{
            return true
        }

    }),
    (req,res,next)=>{
        req.body = matchedData(req,{includeOptionals:false})
        next();
    }

];
exports.deleteUser = [
    check('id').notEmpty().isNumeric()
]
exports.updateUser = [
    check('id').notEmpty().isNumeric(),
    oneOf([
        check('fieldname').equals('lastname'),
        check('fieldName').equals('firstname'),
        check('fieldname').equals('phoneNumber'),
        check('fieldname').equals('birthday'),
    ]),
    check('newData').notEmpty(),
]