let express = require("express")
let router = express.Router();
let controller = require("../controllers/userController.js")
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')
let uploadFile = require('../middlewares/uploadAvatar')

let userLogs = require('../middlewares/userLogs')
let users = require('../middlewares/users')

/* GET/POST - Login & Register */
router.get("/login", controller.login )
router.post("/login",loginValidator, controller.processLogin )

router.get('/register', controller.register)
router.post('/register', uploadFile.single('avatar'), registerValidator, controller.processRegister)

/* GET -Profile */
router.get('/profile', users.activeUser, controller.profile)

router.get('/profile/edit/:id', users.activeUser, controller.editProfile)
router.put('/profile/edit/:id', users.activeUser,registerValidator,uploadFile.single('avatar'),controller.uptateProfile)

/* Get -Logout */
router.get('/logout', controller.logout)


/* POST - Register Data */
router.post('/register', uploadFile.single('avatar'), registerValidator, controller.processRegister)




module.exports=router;