/* ViejoJSON
const {products,writeProductsJson, categories} = require('../data/filesJson/database')
const {id,price,category,talle,color,image} = require('../data/filesJson/products') */
let {validationResult} = require('express-validator')
const fs = require('fs');
const db = require('../data/models');
const Products = db.Product;
const Images = db.Image;
const Categories = db.Category
let controller= {
    create:(req,res) => {
        res.render("admin/productCreate",{
            adminTitle: "Agregar producto",
            session: req.session
        })
    },
    adminCategory:(req,res) => {
        Products.findAll()
        .then(products => {
            res.render('admin/adminCategory',{
                adminTitle: "Categorias",
                session: req.session,
                products
            })
        })
        .catch(error => console.log(error))
    },
    adminSelectionCategory:(req,res) => {
        Products.findByOne({
            where:{
                id: req.params.id
            }
        })
        .then(category => {
            res.render('admin/adminProduct',{
                category,
                adminTitle: category.name,
                session: req.session
            })

        })
        .catch(error => console.log(error))
    },
    store: (req,res) => {
        let errors = validationResult(req);
        let arrayImages=[];
        if(req.files){
            req.fles.forEach((image) => {
                arrayImages.push(image.filename)
            })
        }
        if(errors.isEmpty()){
            const{name,color,size,description,price,image,category_id} = req.body
            Products.create({
                name,
                color,
                size,
                description,
                price,
                image,
                category_id,
            })
            .then((newProduct)=> {
                if(arrayImages.length > 0){
                    let images = arrayImages.map((image) => {
                        return{
                            image:image,
                            productId: newProduct.id
                        }
                    })
                    Images.bulkCreate(images)
                    .then(() => res.redirect('/admin/products'))
                    .catch(error => console.log(error))
                }
                else{
                    Images.create({
                        image: 'JakeSully.jpg',
                        productId: newProduct.id
                    })
                    .then(() => res.redirect('/admin/products'))
                    .catch(error => console.log(error))
                }

            })
            .catch(error => console.log(error))
        }
        else{
            res.render('/admin/products/create',{
            errors: errors.mapped(),
            old: req.body,
            session:req.session
        })
        .catch(error => console.log(error))
        }
    },
    adminEdit: (req,res) => {
        let editId = +req.params.id;
        Promise.all([ Products.findByPk(editId), Categories.findAll()])
        .then(([product,categorie])=> {
            res.render('admin/productEdit',{
                product,
                categorie,
                adminTitle: "Editar producto",
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },
    update: (req,res)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
            const {name,price,size,description,color} = req.body
            Products.uptdate({
                    name : name.trim(),
                    price : +price.trim(),
                    size : +size.trim(),
                    description : description.trim(),
                    color: color
                },
                {
                    where:{
                        id: req.params.id
                    }
                })
                .then(() => {
                    Images.findAll({
                        where:{
                            productId: req.params.id
                        }
                    })
                    .then((productImages) => {
                        if(req.file){
                            if(fs.existsSync("../public/images/products/botas",productImages.image)){
                                fs.unlinkSync(`../public/images/products/botas ${productImages.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/casual",productImages.image)){
                                fs.unlinkSync(`../public/images/products/casual ${productImages.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/elegante",productImages.image)){
                                fs.unlinkSync(`../public/images/products/elegante ${productImages.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/zapatillas",productImages.image)){
                                fs.unlinkSync(`../public/images/products/zapatillas ${productImages.image}`)
                            }
                            else{
                                console.log("No se encontró el archivo")
                            }
                        }
                        Images.destroy({
                            where:{
                                productId:req.params.id
                            }
                        })
                        .then(()=> {
                            Images.create({
                                image:req.file ? req.file.filename: 'JakeSully.jpg',
                                productId: req.params.id
                            })
                            .then(() => {
                                res.redirect('/admin/products')
                            })
                        })
                    })
                    .catch(error => console.log(error))                
                })
            }
            else{
                 Products.findByPk(req.params.id)
                 .then((product)=> {
                     res.redirect(`/admin/products/edit/:${req.params.id}`,{
                         session: req.session,
                         product,
                         errors:errors.mapped(),
                         old:req.body     
                     })
                 })
                 .catch(error => console.log(error)) 
             }
    },
    fatality:(req,res) => {
        let zapaId = +req.params.id;
        Products.findByPk(zapaId)
            if(zapaId){
                if(fs.existsSync("../public/images/products/botas",Products.image)){
                    fs.unlinkSync(`../public/images/products/botas ${Products.image}`)
                }
                else if(fs.existsSync("../public/images/products/casual",Products.image)){
                    fs.unlinkSync(`../public/images/products/casual ${Products.image}`)
                }
                else if(fs.existsSync("../public/images/products/elegante",Products.image)){
                    fs.unlinkSync(`../public/images/products/elegante ${Products.image}`)
                }
                else if(fs.existsSync("../public/images/products/zapatillas",Products.image)){
                    fs.unlinkSync(`../public/images/products/zapatillas ${Products.image}`)
                }
                else{
                    console.log("Archivo no encontrado")
                }
                Products.destroy({where:{id:req.params.id}})
                .then(res.redirect('/admin/category',{
                    session:req.session
                }))
            }
    }
}

module.exports = controller;