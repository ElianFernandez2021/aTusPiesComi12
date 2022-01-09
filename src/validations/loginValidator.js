const {check,body} = require('express-validator')
const {users} = require('../data/database')
const bcrypt = require('bcryptjs')

module.exports = [
    check('email').notEmpty().withMessage('Debes ingresar email').bail(),
    check('password').notEmpty().withMessage('Debes ingresar una contraseña'),

    body('custom').custom((value, {req}) => { 
        let user = users.find(user => user.email === req.body.email) //Variable de usuario igual al que se ingresa por el body
        if(user){//Si el usuario existe...
            if(bcrypt.compareSync(req.body.password ,user.password )){ //Si la contraseña del usuario en json es igual a la ingresada al body...
                return true;
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }).withMessage('Credenciales inválidas')
]