let express = require("express")
let router = express.Router();
let controller = require("../controllers/userController.js")

/* GET - Login & Register */
router.get("/login", controller.login )

router.get('/register',controller.register)

module.exports=router;