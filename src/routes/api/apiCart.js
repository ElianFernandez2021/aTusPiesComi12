let express = require("express")
let router = express.Router();

let {show,add,remove,removeItem,empty} = require("../../controllers/cartController")

router.get("/api/item/:id", add);

module.exports= router;