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

/* Routes */
                //home
                //Login
                //Register
                //ProductDetail
app.use('/productCart',productCartRouter)
app.listen(PORT, ()=> console.log(`Servidor abierto en el puerto ${PORT}
http://localhost:${PORT}`))
