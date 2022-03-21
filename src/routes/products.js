let express=require('express');
const { add, empty, removeItem, remove } = require('../controllers/cartController');
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
router.post('/cart/:id',add)
router.delete('/cart/empty',empty)
router.delete('/cart/item/:id',removeItem)
router.delete('/cart/:id',remove)



module.exports=router;