const {check} = require('express-validator')
module.exports = [
    check("name")
        .notEmpty()
        .withMessage('Debes ingresar un nombre al producto').bail()
        .isLength({min:5})
        .withMessage('La descripcion tiene que tener al menos 5 caracteres'),
    
    check('size')
        .notEmpty()
        .withMessage('Debes ingresar como minimo un talle'),
    
    check('price')
        .notEmpty()
        .withMessage('Debes ingresar un precio').bail(),

    check('colors')
        .isIn([1,2,3,4,5,6,7])
        .withMessage('Debes ingresar como minimo un color'),

]