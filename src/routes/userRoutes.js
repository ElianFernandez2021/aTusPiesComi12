let express = require("express")
let router = express.Router();
let controller = require("../controllers/userController.js")
let registerValidator = require("../validations/registerValidator")
let uploadFile = require("../middlewares/uploadAvatar")

/* GET/POST - Login & Register */
router.get("/login", controller.login )
router.post("/login",loginValidator, controller.processLogin )

router.get('/register', controller.register)
router.post('/register',registerValidator, controller.processRegister)

/* GET -Profile */
router.get('/profile', controller.profile)


/* POST - Register Data */
router.post('/register', uploadFile.single('avatar'), registerValidator, controller.processRegister)




module.exports=router;