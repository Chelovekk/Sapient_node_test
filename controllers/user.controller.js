const { validationResult } = require("express-validator");
const fs = require('fs');

class userController{
     async createUser(req,res){
        try{
            const errors = validationResult(req).formatWith(({param,msg})=>{
                return `${param} : ${msg}`
            });
            if(errors.errors.length){
                res.status(500)
                throw errors.array({onlyFirstError:true})
            } 
            const dbData = await JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));

            dbData.users.push(req.body);
            dbData.users[dbData.users.length-1].id = ++dbData.counter;
            dbData.users[dbData.users.length-1].createdAt = new Date();

            await fs.promises.writeFile('./db/users.json', JSON.stringify(dbData));
            
            res.send('good');
        } catch(e){
            console.log(e);
            res.json({error:e})
        }
    }
    async readUser(req,res){
        try {
            const errors = validationResult(req).formatWith(({param,msg})=>{
                return `${param} : ${msg}`
            });
            if(errors.errors.length){
                res.status(500)
                throw errors.array({onlyFirstError:true})
            }
            const dbData = await JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));
            const user = dbData.users.find(el => el.id == req.params.userId);
            res.send(user)
            
        } catch (e) {
            res.json({error:e})
        }
    }
    async updateUser(req,res){
        try {
            const errors = validationResult(req).formatWith(({param,msg})=>{
                return `${param} : ${msg}`
            });
            if(errors.errors.length){
                res.status(500)
                throw errors.array({onlyFirstError:true})
            } 

            const dbData = await JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));
            if(!dbData.users.find(el=>el.id==req.body.id)){
                res.status(500)
                throw "User not found"
                }

          for(let user of dbData.users){
              if(user.id == req.body.id){
                user[req.body.fieldName] = req.body.newData;
                user.updatedAt = new Date();
              }
          }
          
          await fs.promises.writeFile('./db/users.json', JSON.stringify(dbData))
            res.send(200)
        } catch (e) {
            console.log(e)
            res.json({error:e})
        }
    }
    async deleteUser(req,res){
        try {
            const errors = validationResult(req).formatWith(({param,msg})=>{
                return `${param} : ${msg}`
            });
            if(errors.errors.length){
                res.status(500)
                throw errors.array({onlyFirstError:true})
            }
            
            const dbUsersData = JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));
            if(!dbUsersData.users.find(el=>el.id==req.body.id)){
                res.status(500)
                throw "User not found"
            }
            const dbAddressesData = JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));

            
            dbUsersData.users = dbUsersData.users.filter(el=>el.id!=req.body.id);
            dbAddressesData.addresses = dbAddressesData.addresses.filter(el=>el.user_id!=req.body.id)

            await fs.promises.writeFile('./db/users.json', JSON.stringify(dbUsersData))
            await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbAddressesData))
            
            
            res.send('good')
        } catch (e) {
            console.log(e)
            res.json({error:e})
        }
        
    }
}
module.exports = new userController;