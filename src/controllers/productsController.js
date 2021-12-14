const {product}= require('../data/database')
let controller={
    product: (req,res) => {
        res.render('products')
    },
    detail:(req,res)=>{
        let detailId = +req.params.id,
            detail = product.find(product => product.id === detailId)
        res.render('productDetail',{
            detail
        })
    },
    cart:(req,res)=>{
        res.render('productCart',{
            product
        })
    },
    category: (req,res) => {
        let categoryId = +req.params.id,
            filtrado = product.filter(product => product.category === categoryId)
            res.send(filtrado)//Agrego 2do parametro un json category
    }
}




module.exports=controller;