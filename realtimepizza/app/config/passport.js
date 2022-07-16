const LocalStrategy = require('passport-local').Strategy
const User = require ('../models/user');
const bcrypt = require('bcrypt');


let user;
function init(passport){
    passport.use(new LocalStrategy ({usernameField: 'email'}, async (email,password,done)=>{
        //login
        //check if email exists
         user = await User.findOne({email: email})
        if(!user){
            return done(null,false, {message:'No user with this email'})
        }

        bcrypt.compare(password, user.password).then(match =>{
            if(match){
                return done(null,user, {message:'Logged in succesfully'});
            }
            return done(null,false, {message:'Wrong username or password'});
        }).catch(err =>{
            return done(null,false, {message:'something went wrong'});
        })
    }));

    passport.serializeUser(( user, done ) => {
        done(null,user._id)    //we store _id to the session
    });    

    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user);
        })
    })
    
}

module.exports = init;