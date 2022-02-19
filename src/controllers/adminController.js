let {validationResult} = require('express-validator')
const fs = require('fs');
const db = require('../data/models');
const Products = db.Product;
const Images = db.Product_image;
const Categories = db.Category
const Marks = db.Trade_mark
const Color = db.Color
const Products_color = db.Product_color
let controller= {
    create:(req,res) => {
        let categories = Categories.findAll()
        let marks = Marks.findAll()
        let colors = Color.findAll()
        let images = Images.findAll()
        Promise.all([categories,marks,colors,images])
        .then(([categories,marks,colors,images]) => {
            res.render("admin/productCreate",{
                adminTitle: "Agregar producto",
                session: req.session,
                categories,
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
            include:[{association:'category'},{association:'colors'},{association:'images'},{association:'marca'},]
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
        const{name,description,price,category,trade_mark,size} = req.body
        let errors = validationResult(req);
        let arrayImages=[];
        let arrayColors= [];
        let arraySizes = size.split(',');

        if(req.files){
            req.files.forEach((image) => {
                arrayImages.push(image.filename)
            })
        } 
        
        if(errors.isEmpty()){
            Products.create({
                name:name,
                description:description,
                price:price,
                category_id:category,
                trade_mark:trade_mark,
                arraySizes
            })
            .then((newProduct)=> {
                let colors = arrayColors.map((color) => {
                    return {
                        color_id:+color,
                        product_id:newProduct.id           
                    }
                })
                if(arrayImages.length > 0 ){
                    let images = arrayImages.map((image) => {
                        return{
                            image:image,
                            product_id: newProduct.id
                        }
                    })
                    Images.bulkCreate(images)
                    .then(()=>{
                        Products_color.bulkCreate(colors)
                        .then(()=>{
                            res.redirect('/admin/products')
                        })
                        .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))              
                    
                }
                else {
                    Promise.all([Images.create({
                        image:'default.png',
                        product_id: newProduct.id
                        }),
                    Products_color.bulkCreate(colors)])
                    .then(()=> {
                        res.redirect('/admin/products')
                    })
                    .catch(error => console.log(error))
                }
            })
            .catch(errors => console.log(errors))
        }
        else{
            Promise.all([Categories.findAll(),Marks.findAll(),Color.findAll()])
            .then(([categories,marks,colors]) => {
                
                res.render('admin/productCreate',{
                    categories,
                    marks,
                    colors,
                    errors: errors.mapped(),
                    session:req.session,
                    old:req.body,
                })
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
                {association:'images'},
                {association:'marca'},]}
                ),
            Categories.findAll(),Marks.findAll(),Color.findAll()])
        .then(([product,categories,marks,colors]) => {   
            //res.send(product)         
            res.render('admin/productEdit',{
                product,
                categories,
                marks,
                colors,
                adminTitle: "Editar producto",
                session: req.session,
            })
        })
    .catch(error => console.log(error))
    },
    update: (req,res)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
            const {name,description,price,trade_mark,category,size} = req.body
            Products.update({
                    name,
                    price,
                    description,
                    category_id:category,
                    marca:trade_mark,
                    size
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
                            Images.bulkCreate({
                                image:req.file ? req.file.filename: 'default.png',
                                product_id: req.params.id
                            })
                            .then((product) => {
                                let colors = req.body.colors.map((color) => {
                                    return {
                                        color_id:+color,
                                        product_id:product.id           
                                    }
                                })
                                Products_color.update(
                                    {
                                        color_id:+colors
                                    },
                                    {
                                        where:{
                                            product_id:req.params.id}
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
        Products.findByPk(zapaId,{
            include:[{association:'images'}]
        })
            .then(result => {
                if (zapaId && req.file) {
                    if (fs.existsSync("../public/images/products/botas", result.images.image)) {
                        fs.unlinkSync(`../public/images/products/botas ${result.images.image}`)
                    }
                    else if (fs.existsSync("../public/images/products/casual", result.images.image)) {
                        fs.unlinkSync(`../public/images/products/casual ${result.images.image}`)
                    }
                    else if (fs.existsSync("../public/images/products/elegante", result.images.image)) {
                        fs.unlinkSync(`../public/images/products/elegante ${result.images.image}`)
                    }
                    else if (fs.existsSync("../public/images/products/zapatillas", result.images.image)) {
                        fs.unlinkSync(`../public/images/products/zapatillas ${result.images.image}`)
                    }
                    else {
                        if (fs.existsSync("../public/images/products/", result.images.image)) {
                            fs.unlinkSync(`../public/images/products/ ${result.images.image}`)
                        }
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
                .catch(error => console.log(error)) 
        
        
    }
}

module.exports = controller;