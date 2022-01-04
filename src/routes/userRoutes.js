let express = require("express")
let router = express.Router();
let controller = require("../controllers/userController.js")
let registerValidator = require("../validations/registerValidator")
let uploadFile = require("../middlewares/uploadAvatar")

/* GET - Login & Register */
router.get("/login", controller.login )

router.get('/register',controller.register)


/* POST - Register Data */
router.post('/register', uploadFile.single('avatar'), registerValidator, controller.processRegister)




module.exports=router;