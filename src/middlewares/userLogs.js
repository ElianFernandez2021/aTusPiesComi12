const fs = require('fs')
function userLog(req,res,next){//Esta funcion realiza un historial de rutas al que ingresa cada usuario
    if(req.query.usuario!= undefined){
    fs.appendFileSync('src/log/userLogs.txt',//append Escribe un dato que recibe por parametro sin sobreescribir el existente
    `El usuario ${req.query.usuario}
     ingreso a la ruta: ${req.url}\n`) // \n identifica un salto de linea
    }
    next()
}                  
module.exports = userLog;