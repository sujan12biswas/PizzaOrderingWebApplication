const { authController } = require('../app/http/controllers/authController');

const homeController = require('../app/http/controllers/homeController').homeController().index;

const authController1 = require('../app/http/controllers/authController').authController().login;

const authController2 = require('../app/http/controllers/authController').authController().register;
const authController3 = require('../app/http/controllers/authController').authController().postRegister;
const authController4 = require('../app/http/controllers/authController').authController().postLogin;

const authController5 = require('../app/http/controllers/authController').authController().logout;

const cartController = require('../app/http/controllers/customers/cartController').cartController().cart;
const cartController2 = require('../app/http/controllers/customers/cartController').cartController().update;
//const cartController3 = require('../app/http/controllers/customers/cartController').cartController().orderController;

const orderController = require('../app/http/controllers/customers/orderController').orderController().store;
const orderController2 = require('../app/http/controllers/customers/orderController').orderController().index;
const orderController3 = require('../app/http/controllers/customers/orderController').orderController().show;
// const orderController = require('../app/http/controllers/customers/orderController');

const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');

const adminOrderController = require('../app/http/controllers/admin/orderController').orderController().index;
const statusController = require('../app/http/controllers/admin/statusController').statusController().update;

function initRoutes(app){   // server.js er "app" k use korte gele ekhane pass korate hobe
    app.get('/',homeController);
    
    
    
    app.get('/login', guest, authController1);
    app.post('/login',authController4);
    
5

    app.get('/register', guest, authController2);

    app.post('/register',authController3);

    app.post('/logout',authController5);


    app.get('/cart',cartController);

    app.post('/update-cart',cartController2);

    

    //coustomer routes

    app.post('/orders',orderController);

    app.get('/customer/orders', auth, orderController2);

    app.get('/customer/orders/:id', auth, orderController3);

    //Admin routes

    app.get('/admin/orders',/* admin,*/ adminOrderController);

    
    //admin/order/status

    app.post('/admin/order/status',/* admin,*/ statusController);



    
}



module.exports = {initRoutes};