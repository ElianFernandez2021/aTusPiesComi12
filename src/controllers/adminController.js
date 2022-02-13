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
            include:[{association:'category'},{association:'colors'},
            {association:'sizes'},{association:'images'},{association:'marca'},]
        })
        .then(products => {
            //res.send(products)
            Categories.findAll()
            .then((categories)=> {
                res.render('admin/adminProduct',{
                    products,
                    category_id:req.params.id,
                    categories,  
                })

            })
        })
        .catch(error => console.log(error))
    },
    store: (req,res) => {
        let errors = validationResult(req);
        let arrayImages=[];
        if(req.files){
            req.files.forEach((image) => {
                arrayImages.push(image.filename)
            })
        }
        if(errors.isEmpty()){
            const{name,color,size,description,price,category,trade_mark,image} = req.body
            console.log(req.body)
            Products.create({
                name:name,
                description:description,
                price:price,
                category_id: category,
                trade_mark:trade_mark,
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
                    .then(()=>{
                        let colors = req.body.colors.map((color) => {
                            return {
                                color_id:+color,
                                product_id:newProduct.id           
                            }
                        })
                        console.log(colors)
                        let sizes = req.body.sizes.map((size) => {
                            return {
                                size_id: +size,
                                product_id:newProduct.id
                            }
                        })
                        console.log(sizes)
                        
                        Products_color.bulkCreate(colors)
                        .then(()=>{
                            Products_size.bulkCreate(sizes)
                            .then(()=>{
                                res.redirect('/admin/products')
                            })
                            .catch(error =>console.log(error))
                        })
                        .catch(error =>console.log(error))
                    })
                    .catch(error =>console.log(error))
                }
                else{
                    Images.create({
                        image:'default.png',
                        product_id: newProduct.id
                    })
                    .then(()=> {
                        res.redirect('/admin/products/',{
                            errors:errors.mapped(),
                            old:req.body
                        }) 
                    })
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
        let productId = req.params.id
        Promise.all([Products.findByPk(productId,{
                include:[
                {association:'category'},
                {association:'colors'},
                {association:'sizes'},
                {association:'images'},
                {association:'marca'},]}
                ),
            Categories.findAll(),Sizes.findAll(),Marks.findAll(),Color.findAll()])
        .then(([product,categories,sizes,marks,colors]) => {   
            //res.send(product)         
            res.render('admin/productEdit',{
                product,
                categories,
                sizes,
                marks,
                colors,
                adminTitle: "Editar producto",
                session: req.session
            })
        })
    .catch(error => console.log(error))
    },
    update: (req,res)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
            const {name,price,description,trade_mark} = req.body
            Products.update({
                    name : name.trim(),
                    price : +price.trim(),
                    description :description.trim(),
                    trade_mark,
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
                            if(fs.existsSync("../public/images/products/botas/",productImages.image)){
                                fs.unlinkSync(`../public/images/products/botas/${productImages.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/casual/",productImages.image)){
                                fs.unlinkSync(`../public/images/products/casual/${productImages.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/elegante/",productImages.image)){
                                fs.unlinkSync(`../public/images/products/elegante/${productImages.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/zapatillas/",productImages.image)){
                                fs.unlinkSync(`../public/images/products/zapatillas/${productImages.image}`)
                            }else if(fs.existsSync("../public/images/products/",productImages.image)){
                                fs.unlinkSync(`../public/images/products/${productImages.image}`)
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
                                Promise.all([Products_color.destroy({where:{product_id:req.params.id}}),
                                            Products_size.destroy({where:{product_id:req.params.id}})])
                                .then(() => {
                                   Promise.all([Products_color.update({product_id:req.body.colors},{where:{product_id:req.params.id}}),
                                                Products_size.update({product_id:req.body.size},{where:{product_id:req.params.id}})]) 
                                })
                                .then(()=> {
                                    res.redirect('/admin/products')
                                })

                            .catch(error => console.log(error))  
                        })
                    })
                    .catch(error => console.log(error))  
                })
                .catch(error => console.log(error))                
            })
                .catch(error => console.log(error))  
            }
            else{
                 Products.findByPk(req.params.id,)
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
                    if (fs.existsSync("../public/images/products/botas", result.image.name)) {
                        fs.unlinkSync(`../public/images/products/botas ${result.image.name}`)
                    }
                    else if (fs.existsSync("../public/images/products/casual", result.image.name)) {
                        fs.unlinkSync(`../public/images/products/casual ${result.image.name}`)
                    }
                    else if (fs.existsSync("../public/images/products/elegante", result.image.name)) {
                        fs.unlinkSync(`../public/images/products/elegante ${result.image.name}`)
                    }
                    else if (fs.existsSync("../public/images/products/zapatillas", result.image.name)) {
                        fs.unlinkSync(`../public/images/products/zapatillas ${result.image.name}`)
                    }
                    else {
                        console.log("Archivo no encontrado")
                    }
                }
        })
        
        Products_color.destroy({
            where:{
                product_id:req.params.id
            }
        })
        .then(()=> {
            Products_size.destroy({
                where:{
                    product_id:req.params.id
                }
            })
            .then(()=> {
                Images.destroy({
                    where:{
                        product_id:req.params.id
                    }
                })
                .then(()=>{
                    Products.destroy({
                        where:{
                            id:req.params.id
                        }
                    })
                    .then(res.redirect(`/admin/products`))
                        })                    
                    })
                })
                .catch(error => console.log(error)) 
        
        
    }
}

module.exports = controller;