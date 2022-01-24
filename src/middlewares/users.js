module.exports = {
    
    activeUser: (req,res,next) => {
        if(req.session.user){
            next()
        }
        else{
            res.redirect('/')
        }
    },
    isOffline: (req,res,next) => {
        if( req.session.user === undefined){
            next()
        }
        else{
            console.log(req.session.user.email)
            res.redirect('/')
        }
    }
}