const {check} = require('express-validator')

module.exports = [
    check('usuario').notEmpty().withMessage('Debes ingresar nombre de usuario').bail(),

    check('pass').notEmpty.withMessage('Debes ingresar una contraseña')
]