module.exports = {
    
    activeUser: (req,res,next) => {
        if(req.session.user){
            res.redirect('/user/profile');
        }
        next()
    },
    notUser: (req,res,next) => {
        if(! req.session.user){
            res.redirect('/user/login');
        }
        next()
    }
}