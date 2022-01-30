const fs = require('fs');
const {products,writeProductsJson, categories} = require('../data/filesJson/database')
const {id,price,category,talle,color,image} = require('../data/filesJson/products')
let controller= {
    create:(req,res) => {
        res.render("admin/productCreate",{
            adminTitle: "Agregar producto",
            session: req.session
        })
    },
    adminCategory:(req,res) => {
        res.render('admin/adminCategory',{
            adminTitle: "Categorias",
            session: req.session
        })
    },
    adminSelectionCategory:(req,res) => {
        let categoryId = +req.params.id
        let categorySelection = products.filter(category => +category.category === categoryId)
        let subcategory = categories.filter(product => product.name === categorySelection.subcategory)
        res.render('admin/adminProduct',{
            categorySelection,
            subcategory,
            adminTitle: subcategory.name,
            session: req.session
        })
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
            size: req.body.size,
            color: req.body.color,
            image: req.file ? [req.file.filename] : ["default-image.jpg"]
        }
        products.push(newZapa);
        writeProductsJson(products);
        res.redirect('/admin/products/create',{
            session: req.session
        })
    },
    adminEdit: (req,res) => {
        let editId = +req.params.id,
            edit = products.find(product => product.id === editId);

        res.render('admin/productEdit',{
            edit,
            adminTitle: "Editar producto",
            session: req.session
        })
    },
    update: (req,res)=>{
        let zapaUptdate = +req.params.id;
        const {name,price,size,description,color} = req.body
        products.forEach(zapaEdit => {
            if(zapaEdit.id === zapaUptdate){
                zapaEdit.name = name.trim(),
                zapaEdit.price = +price.trim(),
                zapaEdit.size = +size.trim(),
                zapaEdit.description = description.trim(),
                zapaEdit.color = color
                if(req.file){
                    if(fs.existsSync("../public/images/products/botas",prodcuts.image)){
                        fs.unlinkSync(`../public/images/products/botas ${products.image}`)
                    }
                    else if(fs.existsSync("../public/images/products/casual",prodcuts.image)){
                        fs.unlinkSync(`../public/images/products/casual ${products.image}`)
                    }
                    else if(fs.existsSync("../public/images/products/elegante",prodcuts.image)){
                        fs.unlinkSync(`../public/images/products/elegante ${products.image}`)
                    }
                    else if(fs.existsSync("../public/images/products/zapatillas",prodcuts.image)){
                        fs.unlinkSync(`../public/images/products/zapatillas ${products.image}`)
                    }
                    else{
                        console.log("No se encontró el archivo")
                    }
                }
                else{
                    products.image=products.image;
                }
            }
        })
        writeProductsJson(products)
        res.redirect('/',{
            session: req.session
        })
    },
    fatality:(req,res) => {
        let zapaId = +req.params.id;
        products.forEach( zapa => {
            if(zapa.id === zapaId){
                if(fs.existsSync("../public/images/products/botas",products.image)){
                    fs.unlinkSync(`../public/images/products/botas ${products.image}`)
                }
                else if(fs.existsSync("../public/images/products/casual",products.image)){
                    fs.unlinkSync(`../public/images/products/casual ${products.image}`)
                }
                else if(fs.existsSync("../public/images/products/elegante",products.image)){
                    fs.unlinkSync(`../public/images/products/elegante ${products.image}`)
                }
                else if(fs.existsSync("../public/images/products/zapatillas",products.image)){
                    fs.unlinkSync(`../public/images/products/zapatillas ${products.image}`)
                }
                else{
                    console.log("Archivo no encontrado")
                }
                let zapaToEliminate = products.indexOf(zapa)
                if(zapaToEliminate !== -1){
                    products.splice(zapaToEliminate,1)
                }
                else{
                    console.log("No se encontro la zapatilla")
                }
            }
        })
        writeProductsJson(products);
        res.redirect('/admin/products/category/'+zapaId,{
            session: req.session
        });
    }
}

module.exports = controller;