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
            dbData.users[dbData.users.length-1].updatedAt = new Date();

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
            let userUpdating = dbData.users.find(el=>el.id==req.body.id)
            if(!userUpdating){
                res.status(500)
                throw "User not found"
            } else{
                let index = dbData.users.indexOf(userUpdating)
                dbData.users[index][req.body.fieldName] = req.body.newData;
                dbData.users[index].updatedAt = new Date();
            }
          
          await fs.promises.writeFile('./db/users.json', JSON.stringify(dbData))
            res.send(200)
        } catch (e) {
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
            const dbAddressesData = JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));

            let userDeleting = dbUsersData.users.find(el=>el.id==req.params.userId);
            if(!userDeleting){
                res.status(500)
                throw "User not found"
            }else{
            let index = dbUsersData.users.indexOf(userDeleting)

            dbUsersData.users.splice(index,1);
            dbAddressesData.addresses = dbAddressesData.addresses.filter(el=>el.user_id!=req.params.userId)
            }

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