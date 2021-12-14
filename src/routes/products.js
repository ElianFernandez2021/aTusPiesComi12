let express=require('express')
let router=express.Router();
let controller=require('../controllers/productsController')

/* GET - Products */
router.get('/', controller.product)

/* GET - Categories */
router.get('/category/:id',controller.category)

/* GET - Product detail */
router.get('/detail/:id?',controller.detail)

/* GET - Product cart */
router.get('/cart',controller.cart)


module.exports=router;