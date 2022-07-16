function auth(req,res,next){
    if(req.isAuthenticated()){  // user loggedin or not

        return next();

    }
    return res.redirect('/login');
}

module.exports = auth;