const {validationResult} = require('express-validator')
const {users,writeUserJson} = require('../data/database')
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
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                avatar: user.avatar,
                category: user.category
            }
            res.locals.user = req.session.user
                res.redirect('/')    
        }
        else{
            res.render('login',{
                title:"login",
                errors: errors.mapped(),
                session: req.session
            })
        }
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
               first_name: "------",
               last: "-------",
               email,
               password,
               category:"user",
               avatar:"user.jpg"

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
    profile:(req,res) => {
        let user = users.find(user => user.email === req.body.email)
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar,
            category: user.category
        }
        res.locals.user = req.session.user
        res.render('users',{
            title:"Perfil",
            session:req.session
        })
    },
    editProfile:(req,res) => {
        
    }
}
module.exports=controller;