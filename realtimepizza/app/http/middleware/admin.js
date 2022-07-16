function admin(req,res,next){
    if(req.isAuthenticated() && req.user.roll ==='admin'){  // user loggedin or not

        return next();

    }
    return res.redirect('/');
}

module.exports = admin;