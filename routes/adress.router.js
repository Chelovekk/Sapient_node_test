const { Router } = require('express')
const router = Router()
const adressController = require('../controllers/adress.controller')
const validator = require("../validators/addressValidator");

router.post('/addressadd', validator.createAddress, adressController.createAdress);
router.get('/addressread/:addressId', adressController.readAdress);
router.put('/addressupdate', validator.updateAddress, adressController.updateAdress);
router.get('/addressdelete/:addressId',  adressController.deleteAdress);

module.exports = router


// {
//     "users":  [
//         {
//             "id":"43","lastname":"fdsdf","firstname":"fdsfsda","phoneNumber":"342343242","birthday":"11/33/3213"
//         }
//     ],
//     "counter":"0"
// }
// [{"id":"43","lastname":"fdsdf","firstname":"fdsfsda","phoneNumber":"342343242","birthday":"11/33/3213"}]
