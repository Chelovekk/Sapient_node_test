const { check } = require('express-validator/check');

exports.createAddress = [
    check('id').notEmpty().custom(value=>{
        return !isNaN(value);
    }),
    check('user_id').notEmpty().custom(value=>{
        return !isNaN(value);
    }),
    check('country').notEmpty().custom(value=>{
        let isnum = /\d/.test(value);
        if(isnum){
                return 0
            }

            return 1
    }),
    check('state').notEmpty().custom(value=>{
        let isnum = /\d/.test(value);
        if(isnum){
                return 0
            }

            return 1
    }),
    check('city').notEmpty().custom(value=>{
        let isnum = /\d/.test(value);
        if(isnum){
                return 0
            }

            return 1
    }),
    check('address').notEmpty().isString(),
    check('zipCode').custom(value=>{
        if(!/\d{5}/.test(value)){
            return false;
        } else{
            return true
        }

    })

];
exports.deleteAddress = [
    check('id').notEmpty().custom(value=>{
        return !isNaN(value);
    })
]
exports.updateAddress = [
    check('id').notEmpty().custom(value=>{
        return !isNaN(value);
    })
]