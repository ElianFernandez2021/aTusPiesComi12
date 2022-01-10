//  Variables   //
const express=require('express');
const methodOverride = require('method-override');
const userLogs = require('./src/middlewares/userLogs');
const session = require('express-session')
const PORT = 3030; 
const path = require('path');
const app = express();
//const userLoged = require('userLoged')
const cookieParser = require('cookie-parser')
const cookieSession = require('./src/middlewares/cookieSession');

/* Middlewares */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(userLogs);
app.use(session({
    secret: "aTusPies",
    resave:false,
    saveUninitialized: true  
}))
/* app.use(userLoged) //utilizo este middleware para obtener unicas vistas en caso de que el usuario esté o no logueado*/
app.use(cookieParser())
app.use(cookieSession)


app.set("view engine","ejs");//Template engine
app.set('views', path.join(__dirname,'src/views'));//Ubicacion de vistas


/* Enrutadores */
let indexRouter = require("./src/routes/indexRouter")
let products=require('./src/routes/products')
let userRoutes = require("./src/routes/userRoutes")
let productCreateRouter = require("./src/routes/adminProducts");

/* Routes */
app.use('/',indexRouter)//home
app.use('/user',userRoutes)//Register,Login
app.use('/products',products)//Products,ProductDetail,ProductCart
app.use('/admin',productCreateRouter)
app.listen(PORT, () => console.log(`Servidor abierto en el puerto ${PORT}
http://localhost:${PORT}`))


