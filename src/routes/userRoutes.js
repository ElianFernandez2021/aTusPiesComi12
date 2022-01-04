let express = require("express")
let router = express.Router();
let controller = require("../controllers/userController.js")
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')
let adminUsers = require('../middlewares/adminUsers')

/* GET/POST - Login & Register */
router.get("/login", controller.login )
router.post("/login",loginValidator, controller.processLogin )

router.get('/register', controller.register)
router.post('/register',registerValidator, controller.processRegister)

/* GET -Profile */
router.get('/profile', controller.profile)

module.exports=router;