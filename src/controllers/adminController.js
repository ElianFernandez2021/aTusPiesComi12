const fs = require('fs');
const {products,writeProductsJson} = require('../data/database')
const {id,price,category,talle,color,image} = require('../data/product')
let controller= {
    create:(req,res) => {
        res.render("admin/productCreate")
    },
    store: (req,res) => {
        let lastId = 1;
        products.forEach(zapaStore => {
            if(zapaStore.id > lastId){
                lastId = zapaStore.id;
            }
        })
        let newZapa = {
            id: lastId+1,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            talle: req.body.talle,
            color: req.body.color,
            image: req.file ? [req.file.filename] : ["default-image.jpg"]
        }
        products.push(newZapa);
        writeProductsJson(products);
        res.redirect('/admin/productCreate')
    },
    edit: (req,res) => {
        let editId = +req.params.id,
            edit = products.find(product => product.id === editId);

        res.render('admin/productEdit',{
            edit
        });
    },
    update: (req,res)=>{
        let zapaUptdate = +req.params.id;
        const {name,price,amount} = req.body
        products.forEach(zapaEdit => {
            if(zapaEdit.id === zapaUptdate){
                zapaEdit.id = zapaEdit.id,
                zapaEdit.name = name.trim(),
                zapaEdit.price = +price.trim(),
                zapaEdit.amount = +amount.trim()
            }
        })
        writeProductsJson(products)
        res.redirect('admin/productEdit')
    },
    fatality:(req,res) => {
        let zapaId = +req.params.id;
        products.forEach( zapa => {
            if(zapa.id === zapaId){
                if(fs.existsSync('../public/images/productos/',zapa.image[0])){
                    fs.unlinkSync(`../public/images/productos/${zapa.image[0]}`)
                }
                else{
                    console.log("Archivo no encontrado")
                }
                let zapaToEliminate = zapa.indexOf(zapa)
                if(zapaToEliminate !== -1){
                    zapa.splice(zapaToEliminate,1)
                }
                else{
                    console.log("No se encontro la zapatilla")
                }
            }
        })
        writeProductsJson(products);
        res.redirect('/index');
    }
}

module.exports = controller;