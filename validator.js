const { check } = require('express-validator/check');

exports.createUser = [check('q').isEmail().custom(value=>{
    return 0
})];
