let express = require("express")
let router = express.Router();
let controller = require("../controllers/indexController")

router.get("/", controller.home)
module.exports = router