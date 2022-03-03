const {check} = require('express-validator')
module.exports = [
    check("name")
        .notEmpty()
        .withMessage('Debes ingresar un nombre al producto').bail(),
    
    check('sizes')
        .notEmpty()
        .withMessage('Debes ingresar como minimo un talle'),
    
    check('price')
        .notEmpty()
        .withMessage('Debes ingresar un precio').bail()
        .isNumeric(),
    
    check('colors')
        .notEmpty()
        .withMessage('Debes ingresar como minimo un color')
]