const { check, validationResult } = require("express-validator");

class userController{
    createUser(req,res){
        try{
            const errors = validationResult(req);
            console.log(errors)
            const {userName} = req.body;
            
            res.send('good');
        } catch(e){
            res.send(e)
        }
    }
}
module.exports = new userController;