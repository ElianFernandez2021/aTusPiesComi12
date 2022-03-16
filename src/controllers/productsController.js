//const {products,categories, writeProductsJson}= require('../data/filesJson/database')

const { Op } = require('sequelize');
const db = require('../data/models');

const Products = db.Product;
const Categories = db.Category;
const Cart = db.Cart;
const Products_cart = db.Product_cart

let controller={
    product: (req,res) => {
        Products.findAll({
            include:[{association:'category'},
                    {association:'colors'},
                    {association:'images'}]
        })
        .then((products)=> {
            res.render('products',{
                products,
                title:"Nuestros productos",
                session: req.session    
        })
    })
    },
    cart:(req,res)=>{
        Products.findAll({
            include:[{association:'cart'},{association:'category'},{association:'colors'}]
        })
        .then((products)=>{
            res.render('productCart',{
                products,
                session:req.session
            })
        })
    },
    detail: (req, res) => {
        Products.findOne({
            where: {
                id: req.params.id,
            },
            include: [{association:'colors'},
            {association:'images'},{association:'marca'},]
        })
            .then(((product) => {
                Products.findAll({
                    include: [{association:'colors'},
                    {association:'images'},{association:'marca'},],
                    where: {
                        id: req.params.id,
                    }
                })
                    .then((relatedProducts,colors,marca) => {
                        res.render("productDetail", {
                            product,
                            colors,
                            marca,
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
            {association:'images'},{association:'marca'},]
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
            include: [{association: "images"}]
        })
        .then((result) => {
            res.render("searchResult",{
                result,
                search: req.query.keywords,
                session: req.session
            })
        })
        .catch(errors => console.log(errors))
    }
    
} 
module.exports=controller;