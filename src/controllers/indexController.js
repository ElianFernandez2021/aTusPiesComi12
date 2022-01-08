let controller = {
    home: (req,res) => {
        res.render('index',{
            title: "Home",
            session: req.session
        })
    }
}
module.exports = controller;
