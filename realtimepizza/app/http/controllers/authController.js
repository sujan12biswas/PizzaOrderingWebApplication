const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController(){  //factory function (the function will return something)

//    const getRedirectUrl = (req) => {
//         return req.user.role === "admin" ? '/admin/orders' : '/' ;
      
//    }
    

    return{
        login(req,res){
            res.render('auth/login');
        },
        postLogin(req,res,next){
            const { email, password } = req.body  // to gate the data from users

               

            //validate request (j data thik thak asche ki na)
            if(!email || !password){
                req.flash('error','All fields are required');   //if any error occured for a single required , message will show
               
                
               
                return res.redirect('/login')
            }

            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message);
                    return next(err);
                }
                if(!user){
                    req.flash('error',info.message);
                    return res.redirect('/login');
                }
                req.login(user,(err)=>{
                    if(err){
                        req.flash('error',info.message);
                        return next(err);
                    }
                    // return res.redirect(getRedirectUrl(req));
                    return res.redirect('/');
                    // req.user.role === 'admin' ? return res.redirect('/admin/orders') : return res.redirect('/') ;
                    
                })
            })(req,res,next)
        },
        
        register(req,res){
            res.render('auth/register');
        },

      async  postRegister(req,res){
            const { name, email, password } = req.body  // to gate the data from users

               

            //validate request (j data thik thak asche ki na)
            if(!name || !email || !password){
                req.flash('error','All fields are required');   //if any error occured for a single required , message will show
               
                //jate kono field na dile onno field gulo erase na hoi
                req.flash('name',name);
                req.flash('email',email);
               
                return res.redirect('/register')
            }

            //check if email exist 

            User.exists({ email: email},(err,result)=>{

                if(result){
                    req.flash('error','Email is already taken');   //if any error occured for a single required , message will show
               
                //jate kono field na dile onno field gulo erase na hoi
                req.flash('name',name);
                req.flash('email',email);
               
                return res.redirect('/register')
                }

            })

            //Hash passward
            const hashedPashward = await bcrypt.hash(password,10);

            //create a user

            const user = new User({
                name: name,
                email: email,
                password: hashedPashward
            })


            // after registration
            user.save().then(user =>{
                //Login

                return res.redirect('/') //home a chole asbo
            }).catch(err =>{
                req.flash('error','Something went wrong')

                return res.redirect('/register');
            })

                

            

            
        },

        // logout(req,res,next){
        //     req.logout();   //passport function for logout
        //     return res.redirect('/login');
        // }
        logout(req, res, next) {
            req.logout(function (err) {
              if (err) {
                return next(err);
              }
              // if you're using express-flash
              req.flash('success_msg', 'session terminated');
              res.redirect('/login');
            });
          }

    }

}


module.exports = {authController};