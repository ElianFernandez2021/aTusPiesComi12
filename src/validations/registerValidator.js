const { check, body } = require('express-validator');
const db = require('../data/models')

const User = db.User

module.exports = [
    check('first_name')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2 })
        .withMessage('Debe tener al menos 2 caracteres'),
    

    check('last_name')
        .notEmpty()
        .withMessage('El apellido es requerido')
        .isLength({ min: 2 })
        .withMessage('Debe tener al menos 2 caracteres'),

    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email').custom((value) => {
        return User.findOne({
            where: {
                email: value,
            }
        })
        .then((user) => {
            if(user){
                return Promise.reject('Email ya registrado')
            }
        })
    }),

    check('pass1')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña')
    .isLength({
        min: 8,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 8 y 12 caracteres'),

    body('pass2').custom((value, {req}) => value !== req.body.pass1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar las bases y condiciones')
]