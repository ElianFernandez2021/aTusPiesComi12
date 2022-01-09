let express=require('express')
let router=express.Router();
let controller=require('../controllers/productsController')
let onlyUsers = require('../middlewares/onlyUsers')
let userLogs = require('../middlewares/userLogs')

/* GET - Products */
router.get('/', controller.product)
router.get('/products/category/:id', onlyUsers, userLogs, controller.cart)

/* GET - Search product */
router.get('/search',userLogs, controller.search)

/* GET - Categories */
router.get('/category/:id', userLogs,controller.category)

/* GET - Product detail */
router.get('/detail/:id?', userLogs, controller.detail)

/* GET - Product cart */
router.get('/cart', onlyUsers, userLogs, controller.cart)



module.exports=router;