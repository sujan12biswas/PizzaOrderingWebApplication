function guest(req,res,next){
    if(!req.isAuthenticated()){ //if not loggedin by user
        return next();
    }
    return req.redirect('/');   //if loggedin
}

module.exports = guest ;