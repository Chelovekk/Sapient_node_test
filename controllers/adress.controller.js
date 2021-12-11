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

            dbData.addresses.push(req.body)
            dbData.addresses[dbData.addresses.length-1].id = ++dbData.counter;
            dbData.addresses[dbData.addresses.length-1].createdAt = new Date();
            await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData));
            
            res.send('good');
        } catch(e){
            console.log(e)
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
            if(!dbData.addresses.find(el=>el.id==req.body.id)){
                res.status(500)
                throw "address not found"
            }

            for(let address of dbData.addresses){
                if(address.id == req.body.id){
                    address[req.body.fieldName] = req.body.newData;
                    address.updatedAt = new Date();
                }
            }
          
          await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData))            

            res.send(200)
        } catch (e) {
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
            if(!dbData.addresses.find(el=>el.id==req.body.id)){
                res.status(500)
                throw "Address not found"
            }

            dbData.addresses = dbData.addresses.filter(el=>el.id!=req.body.id);
            await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData))
            res.send('good')
        } catch (e) {
            console.log(e)
            res.json({error:e})
        }  
    }
}
module.exports = new adressController;