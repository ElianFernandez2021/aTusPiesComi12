let controller={
    productCreate:(req,res)=>{
        res.render('productCreate')
    },
    productEdit:(req,res)=>{
        res.render('productEdit')
    }
}
module.exports=controller;