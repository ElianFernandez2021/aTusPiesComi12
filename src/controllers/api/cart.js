const db = require('../../data/models');

let controller = {
    addItem:(req,res) =>{
        db.Product.findOne({
            where:{
                id:req.params.id
            }
        })
        .then(item => {
            res.json(item)
        })
        .catch(error => console.log(error))
    }

    
}
module.exports = controller