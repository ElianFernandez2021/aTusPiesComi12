//  Variables   //
const express=require('express');
let app=express();
const path=require('path');
const PORT=3030; 

/* Middlewares */
app.use(express.static('src/public'));
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))

/* Enrutadores */
let productCartRouter=require('./routes/productCart')
let indexRouter = require("./routes/indexRouter")
let userRoutes = require("./routes/userRoutes")
let productDetailRouter = require("./routes/productDetail")

/* Routes */
app.use('/',indexRouter)//home
app.use('/user',userRoutes)//Register
app.use('/productDetail',productDetailRouter)//ProductDetail
app.use('/productCart',productCartRouter)//ProductCart
app.listen(PORT, ()=> console.log(`Servidor abierto en el puerto ${PORT}
http://localhost:${PORT}`))


