const { response } = require('express')


const db = require('../database/models');
const Order = require('../database/models/Order');
const sequelize = db.sequelize;

const createOrder = async (req, res = response) => {
    // el cart es el carrito que viene del front, es un array de objetos de productos que esta en el cartContext del front
    const { cart } = req.body; // deconstruimos el body para obtener el cart

    try {
        const newOrder = await db.Order.create({ // es necesario crear la orden para obtener el id de la misma
            ...req.body
        });
       
        // Una vez que hemos creado la orden, podemos crear los productos de la orden
        const orderProducts = cart.map((product) => { // recorremos el carrito y creamos un objeto por cada producto
            return {
                product_id: product.id,
                price: product.price,
                quantity: product.qty,
                order_id: newOrder.dataValues.id
            }
        })
        // Una vez que tenemos el array de productos de la orden, podemos crearlos en la tabla intermedia
        // Para eso usamos un loop para crear cada producto de la orden
        for( const product of orderProducts ) { // recorremos el array de productos de la orden que acabamos de crear con el map
            await db.Orders_Product.create(product) // en cada iteracion creamos un producto de la orden
        }

        // Una vez que hemos creado todos los productos de la orden, podemos obtener la orden completa con los productos
        return res.status(201).json({
            ok: true,
            data: newOrder // retornamos la orden completa
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            errorMsg: 'Internal server error',
            error,
            request: req.body
        })
    }

}



module.exports = {
    createOrder
}