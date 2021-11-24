let express=require('express')
let router=express.Router();
let controller=require('../controllers/productCartController')

router.get('/productCart',controller.cart)
module.exports=router;