const { validationResult } = require("express-validator");
const fs = require('fs');

class adressController{
    createAdress(req,res){
        try{
            const errors = validationResult(req);
            if(errors.errors.length){
                console.log(errors)
                throw "validation"
            }
            let data = fs.readFileSync('./db/addresses.json', 'utf-8')
            console.log(data)

            let obj = JSON.parse(data)
            
            obj.push(req.body)
            let newData = JSON.stringify(obj);
            fs.writeFile('./db/addresses.json', newData, (err)=>{
                if (err){
                    throw err
                }
                return
            })
            res.send('good');
        } catch(e){
            res.send('smth wrong')
        }
    }
    readAdress(req,res){
        try {
            let data = fs.readFileSync('./db/addresses.json', 'utf-8')
            let obj = JSON.parse(data)
            let user = obj.find(el=> el.id==req.params.addressId)
            res.send(user)
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
            let data = fs.readFileSync('./db/addresses.json', 'utf-8')

            let obj = JSON.parse(data)
            obj.forEach((el, index,array)=>{
                if(el.id==req.body.id){
                    array[index][req.body.field] = req.body.newData;
                }
            })
            fs.writeFile('./db/addresses.json', JSON.stringify(obj), (err)=>{
                if (err){
                    throw err
                }
                return
            })

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
            let jsonData = fs.readFileSync('./db/addresses.json', 'utf-8')
            let obj = JSON.parse(jsonData)
            obj = obj.filter(el=>el.id!=req.body.id)
            
            fs.writeFile('./db/addresses.json',  JSON.stringify(obj), (err)=>{
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
module.exports = new adressController;