const { validationResult } = require("express-validator");
const fs = require('fs');

class adressController{
    async createAdress(req,res){
        try{
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }
            
            const dbData = JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));

            dbData.addresses.push(req.body)
            dbData.addresses[dbData.addresses.length-1].id = ++dbData.counter;
            await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData));
            
            
            res.send('good');
        } catch(e){
            console.log(e)
            res.send(e)
        }
    }
    async readAdress(req,res){
        try {
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }
            const dbData = await JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));
            const address = dbData.addresses.find(el => el.id == req.params.addressId);
            res.send(address)
        } catch (error) {
            console.log(error)
            res.send('smth bad')
        }
    }
    async updateAdress(req,res){
        try { 
            const errors = validationResult(req);
            if(errors.errors.length){
                throw "validation"
            }

            const dbData = await JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));
          for(let address of dbData.addresses){
              if(address.id == req.body.id){
                address[req.body.fieldName] = req.body.newData;
              }
          }
          
          await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData))            

            res.send(200)
        } catch (error) {
            res.send(error)
        }
    }
    async deleteAdress(req,res){
        try {
            const errors = validationResult(req);
            if(errors.errors.length){
                throw "validation"
            }    
            const dbData = JSON.parse(await fs.promises.readFile('./db/addresses.json', 'utf-8'));
        
            dbData.addresses = dbData.addresses.filter(el=>el.id!=req.body.id);
            await fs.promises.writeFile('./db/addresses.json', JSON.stringify(dbData))
           
            res.send('good')
        } catch (e) {
            console.log(e)
                res.send('bad')
        }  
    }
}
module.exports = new adressController;