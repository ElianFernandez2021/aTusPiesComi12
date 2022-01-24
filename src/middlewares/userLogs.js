const session = require('express-session')
const fs = require('fs')
const time = new Date('dd')
function userLog(req,res,next){//Esta funcion realiza un historial de rutas al que ingresa cada usuario
    if(req.query.user != undefined){
        fs.appendFileSync('src/log/userLogs.txt',//append Escribe un dato que recibe por parametro sin sobreescribir el existente
        `El mail "${req.query.mail}" ingreso a la ruta: ${req.url}\n a las ${time}`) // \n identifica un salto de linea
    }
    next()
}                  
module.exports = userLog;