let express=require('express')
let router=express.Router();
let controller=require('../controllers/productCreateController')

router.get('/', controller.productCreate)

router.get('/',controller.productEdit)
module.exports=router;