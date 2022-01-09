const {validationResult} = require('express-validator')
const {users,writeUserJson} = require('../data/database')
const bcrypt = require('bcryptjs')
let controller={
    login:(req,res)=>{
        res.render('login',{
            title: "Ingresa",
            session: req.session
        })
    },
    processLogin: (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email)
            req.session.user = {
                first_name: user.first_name,
                last_name: user.last_name,
                password: user.password,
                email: user.email,
                avatar: user.avatar,
                category: user.category
            }
            res.locals.user = req.session.user
            res.redirect('/')
        }
        else{
            console.log(errors.mapped())
            res.render('login',{
                title:"login",
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    profile:(req,res) => {
        let user = users.find(user => user.email === req.session.user.email)
        res.render('userProfile',{
            title:"Perfil",
            user,
            session:req.session
        })
    },
    editProfile:(req,res) => {
        
    },
    register:(req,res)=>{
        res.render('register',{
            title: "Registrate",
            session: req.session
        })
    },
    processRegister: (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
           let lastId = 1;
           users.forEach(user => {
               if(user.id > lastId){
                   lastId = user.id
               }
           });
           let {email,password} =req.body
           let newUser = {
               id: lastId+1,
               first_name: "name",
               last_name: "name",
               email,
               password: bcrypt.hashSync(password,10),
               category:"user",
               avatar:req.file ? req.file.filename : "Jake_Sully.jpg"

           }
           users.push(newUser)
           writeUserJson(users)
           res.redirect('/user/login')
        }
        else{
            res.render('register',{
                title:"Registrate",
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    logout: (req,res) =>{
        req.session.destroy(); //Borra todo lo que está en sesion
        res.redirect('/')
    }
}
module.exports=controller;