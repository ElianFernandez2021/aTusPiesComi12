function adminUsers ( req,res,next){
    if(req.session.user.category === 'admin'){
        next()
    }
    else{
        res.redirect('/')
    }
}
module.exports = adminUsers;