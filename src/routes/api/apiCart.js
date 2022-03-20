let express = require("express")
let router = express.Router();

let {addItem} = require("../../controllers/api/cart")

router.get("/api/item/:id", addItem);

module.exports= router;