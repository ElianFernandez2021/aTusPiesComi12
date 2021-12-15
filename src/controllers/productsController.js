const {products,categories}= require('../data/database')
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
            subcategory =  categories.find(category => category.id === categoryId),
            filtrado = products.filter(product => product.categoria === categoryId )
            res.send(filtrado,subcategory)
    }
}




module.exports=controller;