let express=require('express')
let router=express.Router();
let controller=require('../controllers/productCreateController')

router.get('/',controller.create)
module.exports=router;