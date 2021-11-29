let express=require('express')
let router=express.Router();
let controller=require('../controllers/productDetailController')

router.get('/',controller.detail)
module.exports=router;