const db = require('../data/models');

const productVerify = (cart,id) => {
    let index = -1;
    for(let i = 0 ; i< cart.length; i++){
        if(cart[i].id ===+id){
            index = i;
            break; // Corta la ejecucion del for
        }
    }
    return index
}
function responseOk (){
    let response = {
        ok: true,
        meta : {
            total : req.session.cart.length
        },
        data : req.session.cart
    }
    return res.status(200).json(response)
}

module.exports = {
    show : async (req,res) => {
        if(!req.session.cart){
            return res.status(500).json({
                ok: false,
                msg: 'Error de controlador'
            })
        }

        responseOk();
    },
    add : async ( req,res) => {
        try {
            
            let product = await db.Product.findByPk(req.params.id,{
                include:[{association : 'images'}]
            });
            const  {id,name,size,description,price,category_id,trade_mark}=product
            let item = {
                id,
                name,
                size,
                description,
                price,
                category_id,
                trade_mark,
                total: price
            }
            if(req.session.cart.length === 0){
                let cart = await db.Cart.create({
                    user_id : req.session.userLogin.id,
                })
                item = {
                    ...item,
                    item_id:cart.id
                }
                await db.Product_cart.create({
                    cart_id: order.id,
                    product_id: cart.id,
                    quantity: 1
                })
                req.session.cart.push(item)
            }else{
                let index = productVerify(req.session.cart,req.params.id)
                let cart = await db.Cart.findOne({
                    where:{
                        user_id : req.session.userLogin.id
                    }
                })
                if(index === -1){
                    item = {
                        ...item,
                        cart_id: cart.id
                    }
                    req.session.cart.push(item)
                    await db.Product_cart.create({
                        cart_id:cart.id,
                        product_id:item.id,
                        quantity : 1
                    })
                }else{
                    let product = req.session.cart[index]
                    product.amount++;
                    product.total = product.amount * product.price;
                    req.session.cart[index]= product;
                    await db.Product_cart.update({
                        quantity : product.amount
                    },
                    {where:{
                        cart_id : product.cart_id,
                        product_id: product.id
                    }})
                }
            }
            responseOk();

        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    remove : async (req,res) => {
        try {
            let index = productVerify(req.session.cart,req.params.id);
            let product = req.session.cart[index]
            if(product.amount > 1){
                product.amount--;
                product.total = product.amount * product.price
                req.session.cart[index] = product;
                await db.Product_cart.update(
                    {
                        quantity : product.amount
                    },
                    {
                        where:{
                            cart_id : product.cart_id,
                            product_id:product.id
                        }
                    }
                )
            }else{
                req.session.cart.splice(index,1);
                await db.product_cart.destroy({
                    where:{
                        product_id:product.id,
                        cart_id: product.cart_id
                    }
                })
            }
            responseOk();
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    removeItem: async (req,res) => {
        try {
            let index = productVerify(req.session.cart,req.params.id);
            let product = req.session.cart[index];
            req.session.cart.splice(index,1);
            await db.Product_cart.destroy({
                where:{
                    product_id: product.id,
                    cart_id: product.cart_id
                }
            })
            responseOk();
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    empty: async (req,res) => {
        try {
            await db.Cart.destroy({
                where:{
                    user_id:req.session.userLogin.id
                }
            })
            req.session.cart=[];
            responseOk();
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
}