const {update}  = require("../../../models/menu");

function cartController(){  //factory function (the function will return something)

    return{
        cart(req,res){
            res.render('customers/cart');
        },
        update(req,res){


            //For the first time creating cart and adding basic object structure
            if(!req.session.cart){
                req.session.cart ={
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
                
                
            }
            let cart = req.session.cart;
            
            // Check if item does not exist in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty+1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }else{  //the current pizza is already exist in the cart
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;

                cart.totalQty = cart.totalQty+1;
                cart.totalPrice = cart.totalPrice + req.body.price;

            }


            return res.json({totalQty: req.session.cart.totalQty}); // response pathabo j total qty koto a6e, seta pront page er top right a cart a show hobe
        },


        
            
        orderController(req,res){
            console.log(req.body);
        }
            
        
        
        

        

        

    }

}

module.exports = {cartController};