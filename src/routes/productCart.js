let express=require('express')
let router=express.Router();
let controller=require('../controllers/productCartController')

router.get('/',controller.cart)
module.exports=router;