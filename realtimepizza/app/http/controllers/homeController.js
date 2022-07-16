


 const Menu = require('../../models/menu');

function homeController(){  //factory function (the function will return something)

    return{
        
        index(req,res){
            Menu.find({}).then(function(pizzas){
                
                return res.render('home',{pizzas:pizzas});
            });
        }

    }
}
module.exports = {homeController}; 

    