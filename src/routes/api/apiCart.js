let express = require("express")
let router = express.Router();

let {show,add,remove,removeItem,empty} = require("../../controllers/cartController")

router.get("api/cart", show)
router.post("/api/item/:id", add);
router.post("/api/item/:id", remove);
router.post("/api/item/:id", removeItem);
router.post("/api/item/", empty);

module.exports= router;