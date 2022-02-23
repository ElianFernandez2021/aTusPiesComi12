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
    adminCategory: (req, res) => {
        Products.findAll({ include:[{association:'category'},{association:'colors'},{association:'images'},{association:'marca'},]})
        .then(products => {
            res.render('admin/adminProduct',{
                adminTitle: "Categorias",
                session: req.session,
                products
            })
        })
        .catch(error => console.log(error))
    },
   
    store: (req,res) => {
        const{name,description,price,category,trade_mark,colors,size} = req.body
        let errors = validationResult(req);
        let arraySizes= typeof req.body.size !== 'string' ? req.body.size : [req.body.size];
        let arrayColors= typeof req.body.colors !== 'string' ? req.body.colors : [req.body.colors];
        arraySizes=size.split(',')
        arrayColors.push(req.body.colors)
        let arrayImages=[];
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
                trade_mark: trade_mark,
                size:size
            })
            .then((newProduct)=> {
                let colors = arrayColors.map((color) => {
                    return {
                        color_id:color,
                        product_id:newProduct.id           
                    }
                })
                Products_color.bulkCreate(colors)
                .then(()=>{
                    if(arrayImages.length > 0 ){
                        let images = arrayImages.map((image) => {
                            return{
                                image:image,
                                product_id: newProduct.id
                            }
                        })
                        Images.bulkCreate(images)
                        .then(()=>{
                            res.redirect('/admin/products')
                        })
                        .catch(error => console.log(error))
                    }
                    else {
                        Images.create({
                        image:'default.png',
                        product_id: newProduct.id
                        })
                    .then(()=> {
                        res.redirect('/admin/products')
                    })
                    .catch(error => console.log(error))
                }
            })
            .catch(errors => console.log(errors))
        })
            .catch(error => console.log(error))              
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
                {association:'marca'},
            ]}
                ),
            Categories.findAll(),Marks.findAll(),Color.findAll()])
        .then(([product,categories,marks,colors]) => {   
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
        const {name,description,price,trade_mark,category,size,colors} = req.body
        if(errors.isEmpty()){
            let arrayColors= typeof req.body.colors !== 'string' ? req.body.colors : [req.body.colors];
            Products.findByPk(req.params.id)
            .then((product)=> {
                product.update({
                        name,
                        price,
                        description,
                        category_id:category,
                        trade_mark,
                        size:size
                    },
                    {
                        where:{
                            id: req.params.id
                        }
                    })
                    .then(() => {
                        let colors = arrayColors.map((color) => {
                            return {
                                color_id:color.id,
                                product_id:req.params.id           
                            }
                        })       
                        Products_color.update(colors,{
                            where:{id:req.params.id}
                        })
                        .then(()=> {                            
                        Images.findAll({
                            where:{
                                product_id: req.params.id
                            }
                        })                        
                        .then((productImages) => {
                            Images.destroy({
                                where:{
                                    product_id:req.params.id
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
                                let arrayImages=[];
                                req.files.forEach((image) => {
                                    arrayImages.push(image.filename)
                                })
                                if(arrayImages.length > 0 ){
                                    let images = arrayImages.map((image) => {
                                        return{
                                            image:image,
                                            product_id: req.params.id
                                        }
                                    })
                                    Images.create(images)
                                    .then(()=>{
                                        res.redirect('/admin/products')
                                    })               
                                    .catch(error => console.log(error))  
                                }      
                            }
                            else{
                                Images.create({
                                    image:"deafult.png",
                                    product_id: req.params.id
                                })
                                .then(()=>{
                                    res.redirect('/admin/products')
                                })
                                .catch(error => console.log(error))               
                            }
                        })                      
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
                    .then(res.redirect(`/admin/products/`))
                        })                    
                })
                .catch(error => console.log(error)) 
        
        
    }
}

module.exports = controller;