let {validationResult} = require('express-validator')
const fs = require('fs');
const db = require('../data/models');
const Products = db.Product;
const Images = db.Product_image;
const Categories = db.Category
const Sizes = db.Size
const Marks = db.Trade_mark
const Color = db.Color
const Products_size = db.Product_size
const Products_color = db.Product_color
let controller= {
    create:(req,res) => {
        let categories = Categories.findAll()
        let sizes = Sizes.findAll()
        let marks = Marks.findAll()
        let colors = Color.findAll()
        let images = Images.findAll()
        Promise.all([categories,sizes,marks,colors,images])
        .then(([categories,sizes,marks,colors,images]) => {
            res.render("admin/productCreate",{
                adminTitle: "Agregar producto",
                session: req.session,
                categories,
                sizes,
                marks,
                colors,
                images
            })
        })
        .catch(errors => console.log(errors))    
    },
    adminCategory:(req,res) => {
        Categories.findAll()
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

        Products.findAll({
            include:[
                {association:'category'},
                {association:'colors'},
                {association:'sizes'},
                {association:'images'},
                {association:'marca'}
            ]
        })
        .then(products => {
            //res.send(products)
            res.render('admin/adminProduct',{
                products,
                category_id:+req.params.id,
                
            })
        })
        .catch(error => console.log(error))
    },
    store: (req,res) => {
        let errors = validationResult(req);
        let arrayImages=[];
        let arrayColors=[];
        let arraySizes=[];
        if(req.files){
            req.files.forEach((image) => {
                arrayImages.push(image.filename)
            })
        }
        if(errors.isEmpty()){
            const{name,color,size,description,price,category,trade_mark,image} = req.body
            Products.create({
                name:name,
                description:description,
                price:price,
                category_id: category,
                trade_mark:trade_mark,
                image:image,
                color:color,
                size:size
            })
            .then((newProduct)=> {
                if(arrayImages.length > 0){
                    let images = arrayImages.map((image) => {
                        return{
                            image:image,
                            product_id: newProduct.id
                        }
                    })
                        Images.bulkCreate(images)
                        .then(() => res.redirect('/admin/products'))
                        .catch(error => console.log(error))
                }
                else{
                    Images.create({
                        image:'default.png',
                        product_id: newProduct.id
                    })
                    .then(()=> {res.redirect('/admin/products/') })
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
        Promise.all([ Products.findByPk(editId), Categories.findAll(),
        Color.findAll(),Sizes.findAll(),Marks.findAll(),Images.findAll()])
        .then(([product,categories,colors,sizes,marks,images])=> {
            res.render('admin/productEdit',{
                product,
                categories,
                colors,
                sizes,
                marks,
                images,
                adminTitle: "Editar producto",
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },
    update: (req,res)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
            const {name,price,size,description,color,mark} = req.body
            Products.update({
                    name : name.trim(),
                    price : +price.trim(),
                    size : +size.trim(),
                    description : description.trim(),
                    color: color,
                    mark : mark,
                },
                {
                    where:{
                        id: req.params.id
                    }
                })
                .then(() => {
                    Images.findAll({
                        where:{
                            product_id: req.params.id
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
                                product_id:req.params.id
                            }
                        })
                        .then(()=> {
                            Images.create({
                                image:req.file ? req.file.filename: 'default.png',
                                product_id: req.params.id
                            })
                            .then(() => {
                                res.redirect('/admin/products')
                            })
                            .catch(error => console.log(error))  
                        })
                        .catch(error => console.log(error))  
                    })
                    .catch(error => console.log(error))                
                })
                .catch(error => console.log(error))  
            }
            else{
                 Products.findByPk(req.params.id,{
                    include:[
                        {association:'category'},
                        {association:'colors'},
                        {association:'sizes'},
                        {association:'images'},
                        {association:'marca'}
                    ]
                 })
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
            .then(result => {
                if (zapaId) {
                    if (fs.existsSync("../public/images/products/botas", Products.image)) {
                        fs.unlinkSync(`../public/images/products/botas ${Products.image}`)
                    }
                    else if (fs.existsSync("../public/images/products/casual", Products.image)) {
                        fs.unlinkSync(`../public/images/products/casual ${Products.image}`)
                    }
                    else if (fs.existsSync("../public/images/products/elegante", Products.image)) {
                        fs.unlinkSync(`../public/images/products/elegante ${Products.image}`)
                    }
                    else if (fs.existsSync("../public/images/products/zapatillas", Products.image)) {
                        fs.unlinkSync(`../public/images/products/zapatillas ${Products.image}`)
                    }
                    else {
                        console.log("Archivo no encontrado")
                    }
                }
        })
        
                Products.destroy({
                    where:{
                        id:req.params.id
                    },
                    include:[
                        {association:'category'},
                        {association:'colors'},
                        {association:'sizes'},
                        {association:'images'},
                        {association:'marca'}
                    ]
                })
                .then(res.redirect(`/admin/products/category/${req.params.id}`))
                .catch(error => console.log(error)) 
        
        
    }
}

module.exports = controller;