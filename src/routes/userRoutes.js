let express = require("express")
let router = express.Router();
let controller = require("../controllers/userController.js")
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')
let adminUsers = require('../middlewares/adminUsers')
let userLogs = require('../middlewares/userLogs')

/* GET/POST - Login & Register */
router.get("/login", controller.login )
router.post("/login",loginValidator, controller.processLogin )

router.get('/register', controller.register)
router.post('/register',registerValidator, controller.processRegister)

/* GET -Profile */
router.get('/profile', userLogs, controller.profile)

module.exports=router;