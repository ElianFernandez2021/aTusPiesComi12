function cookieSession (req, res, next) {
    if(req.cookies.aTusPies){
        req.session.user = req.cookies.aTusPies;
        res.locals.user = req.session.user
    }
    next()
}

module.exports = cookieSession