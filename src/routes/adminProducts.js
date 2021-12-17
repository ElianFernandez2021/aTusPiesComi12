let express=require('express')
let router=express.Router();
let controller=require('../controllers/adminController')
let upload = require('../middlewares/uploadProductFile')

/* Get - Product */
router.get('/products',controller.adminCategory)
router.get('/products/category/:id',controller.adminSelectionCategory)
/* product create */
router.get('/products/create',controller.create) //Renderisa la vista de carga de producto
router.post('/products', upload.single('image'), controller.store)//Guarda la informacion que almacena en la base de datos(json)
/* product edit */
router.get('/products/edit/:id?',controller.edit)//Renderisa la vista de edicion de producto y recibe un parametro obligatorio que seria el id
router.put('/products/:id',upload.single('image'),controller.update)//Guarda la informacion de un parametro obligatorio y actualiza la base de datos

/* product remove */
router.delete('/products/category/:id',controller.fatality)

module.exports = router