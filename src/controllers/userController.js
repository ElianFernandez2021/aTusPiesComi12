const { users, writeUserJson } = require('../data/database');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')

let controller = {
    login: (req, res) => {
        res.render('login')
    },
    register: (req, res) => {
        res.render('register')
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
                errors: errors.mapped()
            })
        }
    }
}
module.exports = controller;