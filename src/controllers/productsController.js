//const {products,categories, writeProductsJson}= require('../data/filesJson/database')

const { Op } = require('sequelize');
const db = require('../data/models');

const Products = db.Product;
const Categories = db.Category;
const Cart = db.Cart;
const Products_cart = db.Product_cart

let controller={
    product: (req,res) => {
        res.render('products',{
            title:"Nuestros productos",
            session: req.session    
    })
    },
    cart:(req,res)=>{
        Products.findAll({
            include:[{association:'cart'},{association:'category'},
        {association:'sizes'},{association:'colors'}]
        })
        .then((products)=>{
            res.render('productCart',{
                products
            })
        })
       /*  let carrito = products.filter(product => product.name)
        let numeros= products.map( precio => {
            Number(precio.price)
        })
        let total = numeros.reduce((acumulador,numero) => acumulador + numero)
        res.render('productCart',{
            carrito,
            total,
            title:"Carrito de compras",
            session: req.session
        }) */
    },
    detail: (req, res) => {
        Products.findOne({
            where: {
                id: req.params.id,
            },
            include: [{ association: 'images' }]
        })
            .then(((product) => {
                Products.findAll({
                    include: [{ association: 'images' }],
                    where: {
                        id: req.params.id,
                    }
                })
                    .then((relatedProducts) => {
                        res.render("productDetail", {
                            product,
                            sliderTitle: "Productos relacionados",
                            sliderProducts: relatedProducts,
                            session: req.session
                        })
                    })
            }))
    },
    category: (req, res) => {
        Products.findAll({
            include:[{association:'category'},{association:'colors'},
            {association:'sizes'},{association:'images'},{association:'marca'},]
        })
        .then((filtrado) => {
            res.render('category',{
                filtrado,
                category_id:req.params.id,
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },
    search: (req, res) => {
        Products.findAll({
            where:{
                name:{
                    [Op.substring]: req.query.keywords
                }
            },
            include: [{association: "Product_image"}]
        })
        .then((result) => {
            res.render("searchResult",{
                result,
                search: req.query.keywords,
                session: req.session
            })
        })
    }
    
} 
module.exports=controller;

/* 
    detail:(req,res)=>{
        let detailId = +req.params.id,
            detail = products.find(product => product.id === detailId)
        res.render('productDetail',{
            detail,
            title:"Detalles",
            session: req.session
        })
    },
    
    category: (req,res) => {
        let categoryId = +req.params.id
        let filtrado = products.filter(product => +product.category === categoryId )
        let subcategory = categories.filter(product => product.name === filtrado.subcategory)
        res.render('category',{
            filtrado,
            subcategory,
            title:"Categoria "+ categories[categoryId-1].name,
            session: req.session
        })
    },
    search: (req, res) => {
        let keywords = req.query.keywords.trim()
        let result = products.filter(product => product.name.toLowerCase().includes(keywords))
        let subCategory = products.find(product => product.subcategory === keywords.subcategory)
        
        res.render('searchResult', {
            title:"Resultado de la busqueda",
            result,
            search: keywords,
            session: req.session,
            subCategory
        })

    } */