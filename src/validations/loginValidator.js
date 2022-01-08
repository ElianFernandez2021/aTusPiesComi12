const {check,body} = require('express-validator')
const {users} = require('../data/database')

module.exports = [
    check('email').notEmpty().withMessage('Debes ingresar email').bail()
    .isEmail().withMessage("Debes ingresar un email valido"),

    check('password').notEmpty().withMessage('Debes ingresar una contraseña'),

    body('custom').custom((value, {req}) => {
        let user = users.find(user => user.usuario === req.body.usuario) //Variable de usuario igual al que se ingresa por el body
        if(user){//Si el usuario existe...
            if(user.pass === req.body.pass){ //Si la contraseña del usuario en json es igual a la ingresada al body...
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