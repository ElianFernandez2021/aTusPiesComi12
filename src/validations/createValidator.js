const {check,body} = require('express-validator')
let allowedExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i;
module.exports = [
    check("name")
        .notEmpty()
        .withMessage('Debes ingresar un nombre al producto').bail()
        .isLength({min:5})
        .withMessage('El nombre tiene que tener al menos 5 caracteres'),
    
    check('size')
        .notEmpty()
        .withMessage('Debes ingresar como minimo un talle'),
    
    check('price')
        .notEmpty()
        .withMessage('Debes ingresar un precio').bail(),

    check('description')
        .notEmpty()
        .withMessage('Descripcion requerida').bail()
        .isLength({
            min:20
        })
        .withMessage('Debe tener minimo 20 caracteres'),

    check('colors')
        .isIn([1,2,3,4,5,6,7])
        .withMessage('Debes ingresar como minimo un color'),



    

]
