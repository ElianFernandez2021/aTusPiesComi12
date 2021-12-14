let express = require("express")
let router = express.Router();
let controller = require("../controllers/indexController.js")

router.get("/", controller.home )
module.exports = router