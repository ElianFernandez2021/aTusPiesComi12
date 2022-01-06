let express = require("express")
let router = express.Router();
let controller = require("../controllers/userController.js")
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')
let adminUsers = require('../middlewares/adminUsers')
let userLogs = require('../middlewares/userLogs')
let users = require('../middlewares/users')

/* GET/POST - Login & Register */
router.get("/login", users.activeUser, controller.login )
router.post("/login",loginValidator, controller.processLogin )

router.get('/register', users.activeUser, controller.register)
router.post('/register',registerValidator, controller.processRegister)

/* GET -Profile */
router.get('/profile', users.notUser, userLogs, controller.profile)

/* Get -Logout */
router.get('/logout', controller.logout)

module.exports=router;