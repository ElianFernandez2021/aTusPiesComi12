let fs = require('fs');
let path = require ('path');

module.exports = {
    products: JSON.parse(fs.readFileSync(path.join(__dirname,'/product.json'),"utf-8")),
    users: JSON.parse(fs.readFileSync(path.join(__dirname, '/users.json'),"utf-8")),
    writeProductsJson: (database) => { 
        fs.writeFileSync(path.join(__dirname, "/products.json"),JSON.stringify(database),"utf-8")
     },
    writeUserJson: (database) => { 
        fs.writeFileSync(path.join(__dirname, '/users.json'),JSON.stringify(database),"utf-8")
     }
}
