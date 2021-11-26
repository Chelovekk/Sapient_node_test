const{Router} = require('express')
const router = Router()
const userController = require('../controllers/user.controller')
const validator = require("../validator");

router.post('/usercreate', validator.createUser, userController.createUser);

module.exports = router