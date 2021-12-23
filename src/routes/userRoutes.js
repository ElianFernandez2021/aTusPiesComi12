let express = require("express")
let router = express.Router();
let controller = require("../controllers/userController.js")
let adminLog = require('../middlewares/adminUsers')

/* GET/POST - Login & Register */
router.get("/login", adminLog, controller.login )
router.post("/login", adminLog, controller.login )

router.get('/register', controller.register)
router.get('/register', controller.register)

module.exports=router;