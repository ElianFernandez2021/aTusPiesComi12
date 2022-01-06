module.exports = {
    
    activeUser: (req,res,next) => {
        if(req.session.user){
            res.redirect('/users/profile');
        }
        next()
    },
    notUser: (req,res,next) => {
        if(! req.session.user){
            res.redirect('/users/login');
        }
        next()
    }
}