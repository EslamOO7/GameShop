const path = require('path');

const express = require('express');
const { check, body } = require('express-validator');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/users', isAuth,adminController.getUsers);
router.post('/switchUser', isAuth,adminController.switchUser)

// /admin/products => GET
router.get('/products', [check('title').isAlphanumeric().isLength({ min: 4 }).trim(), check('price').isFloat().trim(), check('description').isLength({ min: 4 , max:250})],isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [check('title').isAlphanumeric().isLength({ min: 4 }).trim(), check('price').isFloat().trim(), check('description').isLength({ min: 4, max: 250 })],isAuth, adminController.postEditProduct);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
