const {products}= require('../data/database')
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
        let categoryId = +req.params.id,
            filtrado = products.filter(product => product.categoria === categoryId)
            res.send(filtrado,category[categoryId])//Agrego 2do parametro un json category
    }
}




module.exports=controller;