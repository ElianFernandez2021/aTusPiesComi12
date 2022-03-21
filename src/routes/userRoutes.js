let express = require("express");
let router = express.Router();
let controller = require("../controllers/userController.js");
let loginValidator = require('../validations/loginValidator');
let registerValidator = require('../validations/registerValidator');
let editUserValidator= require('../validations/editUserValidator');
let uploadFile = require('../middlewares/uploadAvatar');

let userLogs = require('../middlewares/userLogs');
let users = require('../middlewares/users');

/* GET/POST - Login & Register */
router.get("/login",userLogs , users.isOffline, controller.login )
router.post("/login",loginValidator, controller.processLogin )

router.get('/register',userLogs , users.isOffline, controller.register)
router.post('/register', uploadFile.single('avatar'), registerValidator, controller.processRegister)

/* GET -Profile */
router.get('/profile',userLogs , users.activeUser, controller.profile)

router.get('/profile/edit/:id',userLogs , users.activeUser, controller.editProfile)
router.put('/profile/edit/:id', users.activeUser,editUserValidator,uploadFile.single('avatar'),controller.updateProfile)

/* Get -Logout */
router.get('/logout', controller.logout)




module.exports=router;