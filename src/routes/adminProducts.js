let express=require('express')
let router=express.Router();
let controller=require('../controllers/adminController')
let upload = require('../middlewares/uploadProductFile')
let admin = require ('../middlewares/adminUsers')
let userLogs = require('../middlewares/userLogs')

/* Get - Product */
router.get('/products',admin, userLogs, controller.adminCategory)
router.get('/products/category/:id',admin, userLogs, controller.adminSelectionCategory)
/* product create */
router.get('/products/create', admin, userLogs, controller.create) //Renderisa la vista de carga de producto
router.post('/products', upload.single('image'), controller.store)//Guarda la informacion que almacena en la base de datos(json)
/* product edit */
router.get('/products/edit/:id?', admin, userLogs, controller.adminEdit)//Renderisa la vista de edicion de producto y recibe un parametro obligatorio que seria el id
router.put('/products/:id',upload.single('image'),controller.update)//Guarda la informacion de un parametro obligatorio y actualiza la base de datos

/* product remove */
router.delete('/products/category/:id', admin, userLogs, controller.fatality)

module.exports = router