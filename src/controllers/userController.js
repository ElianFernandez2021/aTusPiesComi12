const {validationResult} = require('express-validator')
let controller={
    login:(req,res)=>{
        res.render('login')
    },
    processLogin: (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            res.render('login')
        }
        else{
            res.render('login',{
                errors: errors.mapped()
            })
        }
    },
    register:(req,res)=>{
        res.render('register')
    },
    processRegister: (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            res.render('register')
        }
        else{
            res.render('register',{
                errors: errors.mapped()
            })
        }
    }
}
module.exports=controller;