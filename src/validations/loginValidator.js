const {check,body} = require('express-validator')
const {users} = require('../data/models')
const bcrypt = require('bcryptjs')

module.exports = [
    check('email').notEmpty().withMessage('Debes ingresar email').bail(),
    check('password').notEmpty().withMessage('Debes ingresar una contraseña'),

    body('custom').custom((value, {req}) => { 
        let user = users.find(user => user.email === req.body.email) //Variable de usuario igual al que se ingresa por el body
        if(user){
            if(bcrypt.compareSync(req.body.password, user.pass)){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }).withMessage('Credenciales inválidas')
]