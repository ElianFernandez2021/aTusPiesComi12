//  Variables   //
const express=require('express');
let app=express();
const path=require('path');
const PORT=3030; 

/* Middlewares */
app.use(express.static('src/public'));
app.set("view  engine", "ejs")
app.set('views', path.join(__dirname, 'views'))

/* Enrutadores */
let indexRouter=require('./routes/index')
let loginRouter=require('./routes/login')
let registerRouter=require('./routes/register')
let productDetailRouter=require('./routes/productDetail')
let productCartRouter=require('./routes/productCart')

/* Routes */
app.use('/',indexRouter)//home
app.use('/login',loginRouter)//Login
app.use('/register',registerRouter)//Register
app.use('/productDetail',productDetailRouter)//ProductDetail
app.use('/productCart',productCartRouter)//ProductCart
app.listen(PORT, ()=> console.log(`Servidor abierto en el puerto ${PORT}
http://localhost:${PORT}`))
