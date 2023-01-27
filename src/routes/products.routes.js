const { Router } = require('express');
const { showProductsFormEdit } = require('../controllers/products.controller');

const router = Router();

router.get('/new' , showProductsFormEdit ); //http://localhost:3000/products/new

// module.exports = router;
module.exports = router;
