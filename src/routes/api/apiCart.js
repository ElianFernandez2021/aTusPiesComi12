let express = require("express")
let router = express.Router();

let {show,add,remove,removeItem,empty} = require("../../controllers/cartController")

router.get("/api/item/:id", show);
router.post("/api/item/:id",add);
router.post("/api/item/:id",remove);
router.post("/api/item/:id",removeItem);
router.post("/api/item/:id",empty);

module.exports= router;