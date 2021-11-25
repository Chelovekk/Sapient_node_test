const{Router} = require('express')
const router = Router()
const userController = require('../controllers/user.controller')

router.post('/usercreate', userController.createUser);

module.exports = router