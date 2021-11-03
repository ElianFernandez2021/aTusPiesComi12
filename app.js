//  Variables   //
const express=require('express');
let app=express();
const path=require('path');
const PORT=3030; 

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,"/public/views/index.html"))
})
app.get('/productdetail',(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/productDetail"))

})
app.get('Carrito de compras',(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/views/productCart.html"))
})
app.get('Formulario de registro',(req,res)=>{
    res.sendFile()(path.join(__dirname,"/public/views/register.html"))
})
app.get('Formulario de login',(req,res)=>{
    res.sendFile()(path.join(__dirname,"/public/views/login.html"))
})
app.listen(PORT, ()=> console.log(`Servidor abierto en el puerto ${PORT}
http://localhost:${PORT}`))
