const { validationResult } = require("express-validator");
const fs = require('fs');

class adressController{
    async createAdress(req,res){
        try{
            const errors = validationResult(req).formatWith(({param,msg})=>{
                return `${param} : ${msg}`
            });
            if(errors.errors.length){
                res.status(500)
                throw errors.array({onlyFirstError:true})
            }
            
            const dbData = JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));
            const dbUsersData = JSON.parse(await fs.promises.readFile('./db/users.json', 'utf-8'));

            if(!dbUsersData.users.find(el=>el.id==req.body.user_id)){
                res.status(500);
                throw "User not find"
            }

            dbData.addresses.push(req.body)
            dbData.addresses[dbData.addresses.length-1].id = ++dbData.counter;
            dbData.addresses[dbData.addresses.length-1].createdAt = new Date();
            dbData.addresses[dbData.addresses.length-1].updatedAt = new Date();
            await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData));
            
            res.send('good');
        } catch(e){
            res.json({error:e})
        }
    }
    async readAdress(req,res){
        try {
            const errors = validationResult(req).formatWith(({param,msg})=>{
                return `${param} : ${msg}`
            });
            if(errors.errors.length){
                res.status(500)
                throw errors.array({onlyFirstError:true})
            }
            const dbData = await JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));
            const address = dbData.addresses.find(el => el.id == req.params.addressId);
            res.send(address)
        } catch (e) {
            res.json({error:e})
        }
    }
    async updateAdress(req,res){
        try { 
            const errors = validationResult(req).formatWith(({msg, param})=> {
                return`${param} : ${msg}` 
            });
            if(errors.errors.length){
                res.status(500)
                throw errors.array({onlyFirstError:true})
            }

            const dbData = await JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));

            let addressUpdating = dbData.addresses.find(el=>el.id==req.body.id)
            if(!addressUpdating){
                res.status(500)
                throw "Address not found"
            } else{
                let index = dbData.addresses.indexOf(addressUpdating)
                dbData.addresses[index][req.body.fieldName] = req.body.newData;
                dbData.addresses[index].updatedAt = new Date();
            }

            // for(let address of dbData.addresses){
            //     if(address.id == req.body.id){
            //         address[req.body.fieldName] = req.body.newData;
            //         address.updatedAt = new Date();
            //     }
            // }
          
          await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData))            

            res.send(200)
        } catch (e) {
            console.log(e)
            res.json({error:e})
        }
    }
    async deleteAdress(req,res){
        try {
            const errors = validationResult(req).formatWith(({param,msg})=>{
                return `${param} : ${msg}`
            });
            if(errors.errors.length){
                res.status(500)
                throw errors.array({onlyFirstError:true})
            }   
            
            const dbData = JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));

            let addressIndex = dbData.addresses.findIndex(el=>el.id==req.params.addressId);
            
            if(addressIndex === -1){
                res.status(500)
                throw "Address not found"
            }else{
                dbData.addresses.splice(addressIndex,1); 
            }

            await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData))
            res.send('good')
        } catch (e) {
            console.log(e)
            res.json({error:e})
        }  
    }
}
module.exports = new adressController;