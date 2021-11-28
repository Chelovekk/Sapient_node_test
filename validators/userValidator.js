const { check } = require('express-validator/check');

exports.createUser = [
    check('id').notEmpty().custom(value=>{
        return !isNaN(value);
    }),
    check('firstname').notEmpty().custom(value=>{
        let isnum = /\d/.test(value);
        if(isnum){
                return 0
            }

            return 1
    }),
    check('lastname').notEmpty().custom(value=>{
        let isnum = /\d/.test(value);
        if(isnum){
                return 0
            }

            return 1
    }),
    check('phoneNumber').notEmpty().isString(),
    check('birthday').custom(value=>{
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)){
            console.log(false)
            return false;
        } else{
            console.log(true)
            return true
        }

    })

];
exports.deleteUser = [
    check('id').notEmpty().custom(value=>{
        return !isNaN(value);
    })
]
exports.updateUser = [
    check('id').notEmpty().custom(value=>{
        return !isNaN(value);
    })
]