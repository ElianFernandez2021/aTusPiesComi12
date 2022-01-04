const {check,body} = require('express-validator')
const {users} = require('../data/database')

module.exports = [
    check('email').notEmpty().withMessage('Debes ingresar email').bail()
    .isEmail().withMessage("Debes ingresar un email valido"),

    body('email').custom((value) => {
        let user = users.find(user=>{ 
             return user.email == value 
         })
 
         if(user){
             return false
         }else{
             return true
         }
     }).withMessage('Email ya registrado'),

    check('password').notEmpty().withMessage('Debes ingresar una contraseña').bail(),

    body('password1').custom((value, {req}) => value !== req.body.password ? false : true)
    .withMessage('Las contraseñas no coinciden')
]