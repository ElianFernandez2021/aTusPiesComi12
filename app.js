//  Variables   //
const express=require('express');
let app=express();
const path=require('path');
const PORT=3030; 

app.use(express.static('public'));

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,"/views/index.html"))
})
app.get('/productDetail.html',(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/productDetail.html"))
})
app.get('/productCart.html',(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/productCart.html"))
})
app.get('/register.html',(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/register.html"))
})
app.get('/login.html',(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/login.html"))
})
app.listen(PORT, ()=> console.log(`Servidor abierto en el puerto ${PORT}
http://localhost:${PORT}`))
