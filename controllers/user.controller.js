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
            //     res.status(500).send(errors)
            }   
            const dbData = await JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));

            dbData.users.push(req.body);
            dbData.users[dbData.users.length-1].id = ++dbData.counter;
            dbData.users[dbData.users.length-1].createAt = new Date();

            await fs.promises.writeFile('./db/users.json', JSON.stringify(dbData));
            
            res.send('good');
        } catch(e){
            console.log(e);
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
                console.log(errors.errors)
                throw "validation"
            }  
                const dbData = await JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));
          for(let user of dbData.users){
              if(user.id == req.body.id){
                user[req.body.fieldName] = req.body.newData;
                user.updatedAt = new Date();
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
    
        const dbUsersData = JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));
        const dbAddressesData = JSON.parse(await fs.promises.readFile('./db/address.json', 'utf-8'));

        dbUsersData.users = dbUsersData.users.filter(el=>el.id!=req.body.id);
        dbAddressesData.addresses = dbAddressesData.addresses.filter(el=>el.user_id!=req.body.id)

        await fs.promises.writeFile('./db/users.json', JSON.stringify(dbUsersData))
         
        
        res.send('good')
        } catch (e) {
            res.send('bad')
        }
        
    }
}
module.exports = new userController;