const {products,categories, writeProductsJson}= require('../data/database')
let controller={
    product: (req,res) => {
        res.render('products',{
            title:"Nuestros productos",
            session: req.session
        })
    },
    detail:(req,res)=>{
        let detailId = +req.params.id,
            detail = products.find(product => product.id === detailId)
        res.render('productDetail',{
            detail,
            title:"Detalles",
            session: req.session
        })
    },
    cart:(req,res)=>{
        let carrito = products.filter(product => product.name)
        let numeros= products.map( precio => {
            Number(precio.price)
        })
        let total = numeros.reduce((acumulador,numero) => acumulador + numero)
        res.render('productCart',{
            carrito,
            total,
            title:"Carrito de compras",
            session: req.session
        })
        console.log(numeros)
        console.log(total)
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
        
        res.render('searchResult', {
            title:"Resultado de la busqueda",
            result,
            search: keywords,
            session: req.session
        })

    }
}




module.exports=controller;