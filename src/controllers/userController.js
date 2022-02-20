/* const { users, writeUserJson } = require('../data/filesJson/database'); */
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
/* const fs = require('fs') */
const db = require('../data/models');

const Users = db.User
const Image = db.Product_image;

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
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                req.session.user = {
                    id: user.id,
                    first_name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    avatar: user.avatar,
                    rol: user.rol
                }
    
               if(req.body.remember){
                   const TIME_IN_MILISECONDS = 60000
                   res.cookie("aTusPies", req.session.user, {
                       expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                       httpOnly: true,
                       secure: true
                   })
               }
    
                res.locals.user = req.session.user;
    
                res.redirect('/')
            })
        }else{
            res.render('login', {
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
            let { first_name, last_name, email, pass1 } = req.body;
            Users.create({
                first_name, 
                last_name,
                email,
                password: bcrypt.hashSync(pass1, 10),
                avatar: req.file ? req.file.filename : 'Jake_Sully.jpg',
                rol: 0
            })
            .then(() => {
                res.redirect('/user/login')
            })
        }else{
         
            res.render('register', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },
    profile:(req,res) => {
        Users.findByPk(req.session.user.id)
        .then((user)=>{
            res.render('userProfile',{
                title:"Perfil",
                user,
                session:req.session
            })
        })
    },
    editProfile:(req,res) => {
        Users.findByPk(req.params.id)
        .then((user)=>{
            res.render('userEditProfile',{
                title:"Edicion de perfil",
                user,
                session:req.session,
                old:req.body
            })
        })
    },
    updateProfile:(req,res) => {       
            Users.findByPk(req.params.id)
            .then((user)=>{
                const {name,last_name,pass,avatar} = req.body
                Users.update({
                    first_name:name,
                    last_name:last_name,
                    password:pass,
                    avatar
                },{
                    where:{
                        id : req.params.id
                    }
                })
                .then(() => {
                    if(req.file){
                        if(fs.existsSync("./public/images/users/",user.avatar)){
                            fs.unlinkSync(`./public/images/users/${user.avatar}`)
                        }
                        else{
                            console.log("No se encontró el avatar")
                        }
                        user.avatar = req.file.filename
                        Image.destroy({
                            where:{
                                id:req.params.id
                            }
                        })
                        .then(()=>{
                            Image.create({
                                image:req.body.avatar
                            },{
                                where:{
                                    id:req.params.id
                                }
                            })
                            res.redirect('/user/profile/',{
                                session:req.session,
                            })
                        })
                    }
                    else{
                        user.avatar = req.body.avatar
                        Image.update({
                            avatar: 'default-image.png'
                        },{where:{
                            id:req.params.id
                        }})
                        .then(()=>{
                            res.redirect('/user/profile/')
                        })
                    }
                })
            })        
    },
    logout: (req,res) =>{
        req.session.destroy(); //Borra todo lo que está en sesion
        if (req.cookies.userATusPies) { 
            res.cookie('userATusPies', "", { maxAge: -1 })
        }
        res.redirect('/')
    }
}
module.exports = controller;