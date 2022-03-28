let express = require("express")
let router = express.Router();

let {show,add,remove,removeItem,empty} = require("../../controllers/cartController")

router.get("/cart", show)
router.post("/cart/:id", add);
router.delete("/cart/:id", remove);
router.delete("/cart/item/:id", removeItem);
router.delete("/cart/item/", empty);

module.exports= router;