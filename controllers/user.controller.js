class userController{
    createUser(req,res){
        try{
            const {userName} = req.body;
            console.log(req.body.q)
            res.send('good');
        } catch(e){
            res.send(e)
        }
    }
}
module.exports = new userController;