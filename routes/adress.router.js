const{Router} = require('express')
const router = Router()
const adressController = require('../controllers/adress.controller')
const validator = require("../validators/addressValidator");

router.post('/addressadd', validator.createAddress, adressController.createAdress);
router.get('/addressread/:addressId', adressController.readAdress);
router.put('/addressupdate', validator.updateAddress, adressController.updateAdress);
router.post('/addressdelete', validator.deleteAddress,  adressController.deleteAdress);

module.exports = router