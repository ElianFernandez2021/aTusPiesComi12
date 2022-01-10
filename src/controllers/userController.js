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
                rol: user.rol,
                tel: user.tel,
                address: user.address,
                pc: user.pc,
                city: user.city,
                province: user.province
            }
            if(req.body.remember){
                const TIME_IN_MILISECONDS = 600000
                res.cookie("aTusPies", req.session.user, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                })
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
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
           let lastId = 1;
           users.forEach(user => {
               if(user.id > lastId){
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
                old: req.body,
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
        let user = users.find(user => user.email === req.session.user.email)
        res.render('userEditProfile',{
            title:"Edicion de perfil",
            user,
            session:req.session
        })
    },
    uptateProfile:(req,res) => {
        let userId = +req.params.id
        let {name,last_name,email,pass,avatar,teladdress,pc,city,province} = req.body
        users.forEach(usuario => {
            if(usuario.id === userId){
                usuario.id = userId
                usuario.name = name
                usuario.last_name = last_name
                usuario.email = email
                usuario.pass = pass
                usuario.teladdress =teladdress
                usuario.pc =pc
                usuario.province = province
                usuario.city = city
                if(req.file){
                    if(fs.existsSync("./public/images/users/",usuario.avatar)){
                        fs.unlinkSync(`./public/images/users/${usuario.avatar}`)
                    }
                    else{
                        console.log("No se encontró el avatar")
                    }
                    usuario.image = req.file.filename
                }
                else{
                    usuario.image = usuario.image
                }
            }
            })
            writeUserJson(users)
            res.redirect('/user/profile')
        },
    logout: (req,res) =>{
        req.session.destroy(); //Borra todo lo que está en sesion
        res.redirect('/')
    }
}
module.exports = controller;