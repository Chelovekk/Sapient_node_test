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
            let data = fs.readFileSync('./db/users.json', 'utf-8')

            let obj = JSON.parse(data)
            obj.push(req.body)
            let newData = JSON.stringify(obj);
            

            fs.writeFile('./db/users.json', newData, (err)=>{
                if (err){
                    throw err
                }
                return
            })
            res.send('good');
        } catch(e){
            res.send(e)
        }
    }
    readUser(req,res){
        try {
            const id = req.params.userId;
            console.log(id);
            let data = fs.readFileSync('./db/users.json', 'utf-8')
            let obj = JSON.parse(data)
            let user = obj.find(el=> el.id==req.params.userId)
            res.send(user)
        } catch (error) {
            res.send('smth bad')
        }
    }
    updateUser(req,res){
        try {
            console.log(req.body["id"])

            let data = fs.readFileSync('./db/users.json', 'utf-8')

            let obj = JSON.parse(data)
            obj.forEach((el, index, array)=>{
                if(el.id==req.body.id){
                    array[index][req.body.field] = req.body.newData;
                }
            })
            fs.writeFile('./db/users.json', JSON.stringify(obj), (err)=>{
                if (err){
                    throw err
                }
                return
            })

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

        let jsonData = fs.readFileSync('./db/users.json', 'utf-8')
        let obj = JSON.parse(jsonData)
        obj = obj.filter(el=>el.id!=req.body.id)
        
        let newData = JSON.stringify(obj)
        fs.writeFile('./db/users.json', newData, (err)=>{
            if (err){
                throw err
            }
            return
        })
        res.send('good')
        } catch (e) {
            res.send('bad')
        }
        
    }
}
module.exports = new userController;