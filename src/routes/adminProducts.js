let express=require('express')
let router=express.Router();
let controller=require('../controllers/adminController')
let upload = require('../middlewares/uploadProductFile')
/* product create */
router.get('/product/create',controller.create) //Renderisa la vista de carga de producto
router.post('/product', upload.single('image'), controller.store)//Guarda la informacion que almacena en la base de datos(json)
/* product edit */
router.get('/product/:id/edit',controller.edit)//Renderisa la vista de edicion de producto y recibe un parametro obligatorio que seria el id
router.put('/product/:id',upload.single('image'),controller.update)//Guarda la informacion de un parametro obligatorio y actualiza la base de datos

/* product remove */
router.delete('/product/:id',controller.fatality)

module.exports = router