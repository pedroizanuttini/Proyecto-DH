const { Router } = require('express');
const { showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads' })
const { fieldValidator } = require('../middlewares/fields-validators');
const { body } = require('express-validator');
const fileFilter=require('../middlewares/multer-validation');
const privateMiddleware = require('../middlewares/privateRoute');

const router = Router();

router.get('/', privateMiddleware,showProducts); //http://localhost:3000/products
router.get('/new', privateMiddleware, showProductsFormEdit ); //http://localhost:3000/products/new
router.get('/:id', showProductDetail); //http://localhost:3000/products/:id

router.post('/',fileFilter, privateMiddleware, upload.single('image'),[
    body('name','el nombre debe tener al menos 5 caracteres').isLength({min:5}),
    body('description', 'la descripcion debera tener al menos 20 caracteres').isLength({min:20}),
    fieldValidator
], createProduct); //http://localhost:3000/products  //el middleware es lo que definimos como upload.
router.post('/delete/:id', privateMiddleware, deleteProduct) //http://localhost:3000/products/:id
router.get('/:id/edit',privateMiddleware, showProductsFormEdit ); //http://localhost:3000/products/:id/edit
router.post('/:id',privateMiddleware, updateProduct); //http://localhost:3000/products/:id


// module.exports = router;
module.exports = router;
