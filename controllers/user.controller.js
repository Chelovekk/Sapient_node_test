const { validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');

class userController{
     async createUser(req,res){
        try{
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }   
            const dbData = await JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));

            dbData.users.push(req.body);
            dbData.users[dbData.users.length-1].id = ++dbData.counter;

            await fs.promises.writeFile('./db/users.json', JSON.stringify(dbData));
            

            
            res.send('good');
        } catch(e){
            res.send('smth bad')
        }
    }
    async readUser(req,res){
        try {
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }
            const dbData = await JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));
            const user = dbData.users.find(el => el.id == req.params.userId);
            res.send(user)
            
        } catch (error) {
            res.send('smth bad')
        }
    }
    async updateUser(req,res){
        try {
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }  
            const dbData = await JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));
            console.log(dbData.users);
          for(let user of dbData.users){
              if(user.id == req.body.id){
                user[req.body.fieldName] = req.body.newData;
              }
          }
          
          await fs.promises.writeFile('./db/users.json', JSON.stringify(dbData))
            res.send(200)
        } catch (error) {
            res.send("smth bad")
        }
    }
    async deleteUser(req,res){
        try {
    
        const dbData = JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));
        
        dbData.users = dbData.users.filter(el=>el.id!=req.body.id);
        await fs.promises.writeFile('./db/users.json', JSON.stringify(dbData))
         
        
        res.send('good')
        } catch (e) {
            res.send('bad')
        }
        
    }
}
module.exports = new userController;