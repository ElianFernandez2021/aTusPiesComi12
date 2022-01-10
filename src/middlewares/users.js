module.exports = {
    
    activeUser: (req,res,next) => {
        if(req.session.user){
            next()
        }
        else{
            res.redirect('/')
        }
    }
}