const { Router } = require('express');
const { showProductsFormEdit, showProductDetail, createProduct, updateProduct, deleteProduct, getProducts, getProductDetail } = require('../controllers/products.controller');
// const multer  = require('multer')
// const upload = multer({ dest: 'public/uploads' })
const { fieldValidator } = require('../middlewares/fields-validators');
const { body } = require('express-validator');
const fileFilter=require('../middlewares/multer-validation');


const router = Router();

router.get('/', getProducts); //http://localhost:3000/api/v1/products
router.get('/',getProductDetail); //http://localhost:3000/api/v1/products/:id
router.post('/',
 createProduct); //http://localhost:3000/products  //el middleware es lo que definimos como upload.
router.post('/delete/:id', deleteProduct) //http://localhost:3000/api/v1/products/:id 
router.post('/:id', updateProduct); //http://localhost:3000/products/:id


// module.exports = router;
module.exports = router;
