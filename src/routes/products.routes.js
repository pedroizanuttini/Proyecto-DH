const { Router } = require('express');
const { showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads' })
const { fieldValidator } = require('../middlewares/fields-validators');
const { check, body } = require('express-validator');
const fileFilter=require('../middlewares/multer-validation');

const router = Router();

router.get('/', showProducts); //http://localhost:3000/products
router.get('/new' , showProductsFormEdit ); //http://localhost:3000/products/new
router.get('/:id', showProductDetail); //

router.post('/',fileFilter, upload.single('image'),[
    body('name','el nombre debe tener al menos 5 caracteres').isLength({min:5}),
    body('description', 'la descripcion debera tener al menos 20 caracteres').isLength({min:20}),
    fieldValidator
], createProduct); //http://localhost:3000/products  //el middleware es lo que definimos como upload.
router.get('/:id/edit' , showProductsFormEdit ); //http://localhost:3000/products/:id/edit
router.post('/:id', updateProduct); //http://localhost:3000/products/:id
router.delete('/:id', deleteProduct) //http://localhost:3000/products/:id


// module.exports = router;
module.exports = router;
