const ADMIN_USERS = ['Luciana','Roberto','Elian','Facundo']
let path = require('path')

function adminUsers ( req,res,next){
    if(req.query.usuario === 'Luciana'||req.query.usuario === 'Roberto'||req.query.usuario === 'Elian'||req.query.usuario === 'Facundo'){
        res.render('/admin/products')
    }
    else{
        res.redirect('index')
    }
}
module.exports = adminUsers;