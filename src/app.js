//  Variables   //
const express=require('express');
let app=express();
const path=require('path');
const PORT=3030; 
const methodOverride = require('method-override');

/* Middlewares */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");//Template engine
app.set('views', path.join(__dirname,'src/views'));//Ubicacion de vistas


/* Enrutadores */
let indexRouter = require("./src/routes/indexRouter")
let products=require('./src/routes/products')
let userRoutes = require("./src/routes/userRoutes")
let productCreateRouter = require("./src/routes/adminProducts")

/* Routes */
app.use('/',indexRouter)//home
app.use('/user',userRoutes)//Register,Login
app.use('/products',products)//Products,ProductDetail,ProductCart
app.use('/admin',productCreateRouter)
app.listen(PORT, () => console.log(`Servidor abierto en el puerto ${PORT}
http://localhost:${PORT}`))


