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
        console.log(req.files)
        const{name,description,price,category,trade_mark,colors,size} = req.body
        let errors = validationResult(req);
        let arraySizes= typeof req.body.size !== 'string' ? req.body.size : [req.body.size];
        let arrayColors= typeof req.body.colors !== 'string' ? req.body.colors : [req.body.colors];
        arraySizes=size.split(',')
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
             errors = errors.mapped()
            /* if(req.fileValidationError) {
                console.log(req.fileValidationError)
                errors = {
                    ...errors,
                    image : {
                        msg: req.fileValidationError
                    }
                } 
            }        
            */
            console.log(errors)
            Promise.all([Categories.findAll(),Marks.findAll(),Color.findAll()])
            .then(([categories,marks,colors]) => {                
                res.render('admin/productCreate',{
                    categories,
                    marks,
                    colors,
                    errors,
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
        console.log(errors)
        const {name,description,price,trade_mark,category,size,colors} = req.body
        let arrayColors= typeof req.body.colors !== 'string' ? req.body.colors : [req.body.colors];
        if(errors.isEmpty()){
            let colores = arrayColors.map((color) => {
                return {
                    color_id:color,
                    product_id:req.params.id           
                }
            })
            Products_color.destroy({where:{product_id:req.params.id}
            })
            .then(() => {  
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
                    {where:{id: req.params.id}})
                    Products_color.bulkCreate(colores)
                    .then(() => {
                    console.log(colores)
                    Images.findAll({where:{product_id: req.params.id}})                        
                    .then((oldImage) => {
                        productImages=req.files                        
                        if(req.files){
                            if(fs.existsSync("../public/images/products/",oldImage.image)){
                                fs.unlinkSync(`../public/images/products/${oldImage.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/botas/",oldImage.image)){
                                fs.unlinkSync(`../public/images/products/botas/${oldImage.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/casual/",oldImage.image)){
                                fs.unlinkSync(`../public/images/products/casual/${oldImage.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/elegante/",oldImage.image)){
                                fs.unlinkSync(`../public/images/products/elegante/${oldImage.image}`)
                            }
                            else if(fs.existsSync("../public/images/products/zapatillas/",oldImage.image)){
                                fs.unlinkSync(`../public/images/products/zapatillas/${oldImage.image}`)
                            }
                            let arrayImages=[];
                            productImages.forEach((image) => {
                                arrayImages.push(image.filename)
                            })
                            if(arrayImages.length > 0 ){
                                let images = arrayImages.map((image) => {
                                    return{
                                        image:image,
                                        product_id: req.params.id
                                    }
                                })
                                //console.log(images) //Miro que trae la variable images
                                Images.destroy({
                                    where:{product_id:req.params.id}
                                })
                                .then(() => {
                                    Images.bulkCreate(images)
                                    .then(()=>{res.redirect('/admin/products')})               
                                    .catch(error => console.log(error))
                                })
                                .catch(error => console.log(error))
                            }
                            else{
                                console.log("No se encontró el archivo")
                                res.redirect('/admin/products')
                            }
                        }           
                    })
                    .catch(error => console.log(error)) 
                })
                .catch(error => console.log(error))               
            })
            .catch(error => console.log(error))               
            })
        }else{
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
            
            res.render('admin/productEdit',{
                product,
                categories,
                marks,
                colors,
                adminTitle: "Editar producto",
                session: req.session,
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
            .then(result => { console.log(result)
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
                    else if (fs.existsSync("../public/images/products/", result.images.image)) {
                            fs.unlinkSync(`../public/images/products/ ${result.images.image}`)
                        }
                    }else{
                        console.log("Archivo no encontrado")
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
                Products.destroy({where:{id:req.params.id}})
                .then(res.redirect('/admin/products/'))
            })                    
        })
        .catch(error => console.log(error))        
    }
}

module.exports = controller;