function isLoggedIn(req, res, next){
    if(req.session.user === undefined) {
        res.redirect("/auth/login")
    }else {
        next()
    }
    

}

module.exports = isLoggedIn