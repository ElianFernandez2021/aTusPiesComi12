const {check,body} = require('express-validator')
const db = require('../data/models')
const bcrypt = require('bcryptjs')

const Users = db.User

module.exports = [
    check('email')
        .notEmpty()
        .withMessage('Debes ingresar email').bail(),
    
    check('password')
        .notEmpty()
        .withMessage('Debes ingresar una contraseña'),

        body('custom')
        .custom((value, {req}) => {
           return Users.findOne({
               where: {
                   email: req.body.email
               }
           })
           .then(user => {
               if(!bcrypt.compareSync(req.body.password, user.dataValues.password)){
                   return Promise.reject()
               }
           })
           .catch(() => {
               return Promise.reject("Email o contraseña incorrecta")
           })
        })
]