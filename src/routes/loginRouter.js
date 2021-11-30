let express = require("express")
let router = express.Router();
let controller = require("../controllers/loginController.js")

router.get("/", controller.login )
module.exports = router