const {products,categories, writeProductsJson}= require('../data/database')
let controller={
    product: (req,res) => {
        res.render('products')
    },
    detail:(req,res)=>{
        let detailId = +req.params.id,
            detail = products.find(product => product.id === detailId)
        res.render('productDetail',{
            detail
        })
    },
    cart:(req,res)=>{
        res.render('productCart',{
            products
        })
    },
    category: (req,res) => {
        let categoryId = +req.params.id
        let filtrado = products.filter(product => +product.category === categoryId )
        let subcategory = categories.filter(product => product.name === filtrado.subcategory)
        res.render('category',{
            filtrado,
            subcategory
        })
    }
}




module.exports=controller;