module.exports = {
    
    activeUser: (req,res,next) => {
        if(req.session.user){
            res.redierct('/users/profile');
        }
        next()
    },
    notUser: (req,res,next) => {
        if(! req.session.user){
            res.redierct('/users/login');
        }
        next()
    }
}