let express=require('express')
let router=express.Router();
let controller=require('../controllers/adminController')
let upload = require('../middlewares/uploadProductFile')
let admin = require ('../middlewares/adminUsers')
let userLogs = require('../middlewares/userLogs')
let createValidator = require('../validations/createValidator')
let editValidator = require('../validations/editValidator');

/* Get - Product */
router.get('/products',/* admin, */ controller.adminCategory)
/* product create */
router.get('/products/create',/* admin, */ controller.create) //Renderisa la vista de carga de producto
router.post('/products', upload.array('image'), createValidator, controller.store)//Guarda la informacion que almacena en la base de datos(json)
/* product edit */
router.get('/products/edit/:id?',/* admin, */ controller.adminEdit)//Renderisa la vista de edicion de producto y recibe un parametro obligatorio que seria el id
router.put('/products/:id',upload.array('image'),editValidator, controller.update)//Guarda la informacion de un parametro obligatorio y actualiza la base de datos

/* product remove */
router.delete('/products/:id',/* admin, */ controller.fatality)

module.exports = router