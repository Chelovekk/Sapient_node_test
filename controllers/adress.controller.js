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
            const fileData = await fs.promises.readFile('./db/addresses.json', 'utf-8');
            fileData = JSON.parse(fileData);
            fileData.push(req.body);
            await fs.promises.writeFile('./db/addresses.json', JSON.stringify(fileData));
            
            
            res.send('good');
        } catch(e){
            res.send('smth wrong')
        }
    }
    readAdress(req,res){
        try {
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }
            fs.promises.readFile('./db/addresses.json', 'utf-8')
            .then(result=>{
                result = JSON.parse(result)
                result = result.find(el=> el.id==req.params.addressId)
                res.send(result)
            })
            .catch(err=>{console.log(err)})
        
        } catch (error) {
            res.send('smth bad')
        }
    }
    updateAdress(req,res){
        try { 
            const errors = validationResult(req);
            if(errors.errors.length){
                throw "validation"
            }


            fs.promises.readFile('./db/addresses.json', 'utf-8')
            .then(result=>{
                result = JSON.parse(result)
                result.forEach((el, index,array)=>{
                    if(el.id==req.body.id){
                        array[index][req.body.field] = req.body.newData;
                    }
                })
                fs.promises.writeFile('./db/addresses.json', JSON.stringify(result))
                .catch(err=>{console.log(err)})
            })
            .catch(err=>{console.log(err)})
            

            res.send(200)
        } catch (error) {
            res.send(error)
        }
    }
    deleteAdress(req,res){
        try {
            const errors = validationResult(req);
            if(errors.errors.length){
                throw "validation"
            }    
             fs.promises.readFile('./db/addresses.json', 'utf-8')
             .then(result=>{
                result = JSON.parse(result)
                result = result.filter(el=>el.id!=req.body.id)
                fs.promises.writeFile('./db/addresses.json',  JSON.stringify(result))
               .catch(err=>{console.log(err)})

             })
             .catch(err=>{console.log(err)})
           
            res.send('good')
        } catch (e) {
                res.send('bad')
        }  
    }
}
module.exports = new adressController;