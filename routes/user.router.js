const{Router} = require('express')
const router = Router()
const userController = require('../controllers/user.controller')
const validator = require("../validators/userValidator");

router.post('/usercreate', validator.createUser, userController.createUser);
router.get('/user/:userId', userController.readUser);
router.put('/userupdate',validator.updateUser , userController.updateUser);
router.post('/userdelete',validator.deleteUser , userController.deleteUser);

module.exports = router