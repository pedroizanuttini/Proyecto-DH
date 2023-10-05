const { Router } = require('express');
const {createOrder}=require('../controllers/order.controller');


const router = Router();

// TODO: implementar middleware de validación de campos para crear una orden: user, products, total...etc.
router.post('/', createOrder); //http://localhost:3000/api/v1/order

module.exports = router;