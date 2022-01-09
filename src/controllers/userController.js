const { users, writeUserJson } = require('../data/database');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const fs = require('fs')

let controller={
    login:(req,res)=>{
        res.render('login',{
            title: "Ingresa",
            session: req.session
        })
    },
    processLogin: (req, res) => {
        
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email)
            req.session.user = {
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                avatar: user.avatar,
                tel: user.tel,
                address: user.address,
                pc: user.pc,
                city: user.city,
                province: user.province
            }
            res.locals.user = req.session.user;
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
    register:(req,res)=>{
        res.render('register',{
            title: "Registrate",
            session: req.session
        })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let lastId = 1;

            users.forEach(user => {
                if (user.id > lastId) {
                    lastId = user.id
                }
            });
            let { name, last_name, email, pass1 } = req.body

            let newUser = {
                id: lastId + 1,
                name,
                last_name,
                email,
                pass: bcrypt.hashSync(pass1, 10),
                avatar: req.file ? req.file.filename : "default-image.png",
                rol: "ROL_USER",
                tel: "",
                address: "",
                pc: "",
                city: "",
                province: ""
            }

            users.push(newUser)

            writeUserJson(users)

            res.redirect('/user/login')

        } else {
            res.render('register', {
                title:"Registrate",
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
    editProfile:(req,res) => {},
    logout: (req,res) =>{
        req.session.destroy(); //Borra todo lo que está en sesion
        res.redirect('/')
    }
}
module.exports = controller;