require('dotenv').config();

const favicon = require('serve-favicon');

const express = require ('express');
const app = express();
const ejs = require ('ejs');
const path = require('path');
const expressLayout = require ('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo'); 
const bp = require('body-parser');
const passport = require('passport');
const Emitter = require('events');


app.use(favicon(path.join(__dirname, 'favicon.ico')));







//Database connection

const url ='mongodb://localhost:27017/pizza';


mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Database connected...");
}).on('error',()=>{
    console.log("connection failed...");
});

//Event Emitter

const eventEmitter = new Emitter();
app.set('eventEmitter',eventEmitter);


// Session Config

app.use(session ({
    secret: process.env.SESSION_SECRET || 'sujanbiswas',
    resave: false,
    
    store: MongoDbStore.create({
        
        client: connection.getClient()
        
    }),
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}    //one day
}))

//Passport congig

const passportInit = require('../app/config/passport');
passportInit(passport);

app.use(passport.initialize());
app.use(passport.session());   //because is worked by the help of session

// using flash

app.use(flash());



//Assects
app.use(express.static('public'));  //eta korle public folder er css er app.css k nite parbe... na korle sudhu html e nebe

//Global Middleware
app.use((req,res, next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

// to receiving JSON data 
app.use(bp.json());     // by default express a json data receive kora jai na, tai eta korte hoi
app.use(bp.urlencoded({ extended: false}));

// Set tamplate engine

app.use(expressLayout); // now express will know which layout should be use

app.set('views',path.join(__dirname,'../resources/views'));   // generating the path

app.set('view engine','ejs');   // telling the express that which tamplate engine will use


//Routes



require('./web').initRoutes(app);



//

const server = app.listen(PORT,()=>{
    console.log(`Listening on port no ${PORT}`);
})



//Socket


const io = require('socket.io')(server);

io.on('connection',(socket) =>{
    
    socket.on('join',(orderId) => {
        
        socket.join(orderId);
    })
})

eventEmitter.on('orderUpdated',(data) =>{
    io.to(`order_${data.id}`).emit('orderUpdated',data);
})

eventEmitter.on('orderPlaced',(data) =>{
    io.to('adminRoom').emit('orderPlaced',data);
})




