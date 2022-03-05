const {check} = require('express-validator')
module.exports = [
    check("name")
        .notEmpty()
        .withMessage('Debes ingresar un nombre al producto').bail()
        .isLength({min:5})
        .withMessage('La descripcion tiene que tener al menos 5 caracteres'),
    
    check('productSize')
        .notEmpty()
        .withMessage('Debes ingresar como minimo un talle, separados por coma (,)'),
    
    check('price')
        .notEmpty()
        .withMessage('Debes ingresar un precio').bail(),

    check('colors')
        .notEmpty()
        .withMessage('Debes ingresar como minimo un color'),

]