const { validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');

class userController{
     createUser(req,res){
        try{
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }
            fs.promises.readFile('./db/users.json', 'utf-8')
            .then(result=>{
                result = JSON.parse(result)
                result.push(req.body);
                fs.promises.writeFile('./db/users.json', JSON.stringify(result))
            })
            .catch(err=>console.log(err))
            

            
            res.send('good');
        } catch(e){
            res.send(e)
        }
    }
    readUser(req,res){
        try {
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }
            const id = req.params.userId;
            console.log(id);
            fs.promises.readFile('./db/users.json', 'utf-8')
            .then(result=>{
                result = JSON.parse(result)
                let user = result.find(el=> el.id==req.params.userId)
                res.send(user)
            })
            
            
        } catch (error) {
            res.send('smth bad')
        }
    }
    updateUser(req,res){
        try {

            let data = fs.promises.readFile('./db/users.json', 'utf-8')
            .then(result=>{
                result = JSON.parse(result)

                result.forEach((el, index, array)=>{
                    if(el.id==req.body.id){
                        array[index][req.body.field] = req.body.newData;
                    }
                })
                
                fs.promises.writeFile('./db/users.json', JSON.stringify(result))
                 .catch(err=>console.log(err))

            })
            .catch(err=>console.log(err))
            res.send(200)
        } catch (error) {
            res.send("smth bad")
        }
    }
    deleteUser(req,res){
        try {
        const errors = validationResult(req);
        console.log(errors)
        const {data} = req.body;

        let jsonData = fs.promises.readFile('./db/users.json', 'utf-8')
        .then(result=>{
            result = JSON.parse(result)
            result = result.filter(el=>el.id!=req.body.id)
            fs.promises.writeFile('./db/users.json', JSON.stringify(result))
        })
        
        res.send('good')
        } catch (e) {
            res.send('bad')
        }
        
    }
}
module.exports = new userController;