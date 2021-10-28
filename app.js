//  Variables   //
const express=require('express');
let app=express();
const path=require('path');
const PORT=3030;
//Popup carrito de compras
var buttonOpenPopup = document.getElementById('button-open-popup');
var overlay = document.getElementById('overlay');
var popup = document.getElementById('popup');
var buttonClosePopup = document.getElementById('button-close-popup');
buttonOpenPopup.addEventListener('click',function(){
    overlay.classList.add('active');
})
 

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,"/public/views/index.html"))
})
app.get('Detalle del producto',(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/views/productDetail.html"))

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
