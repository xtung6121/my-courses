const express = require('express')
const router = express.Router()
const productController = require('~/controllers/ProductController')

// router cart 
router.get('/cart', productController.getCart)

router.post('/cart', productController.postCart)

router.post('/cart-delete-item', productController.postCartDeleteProduct);


// router products
router.get('/create', productController.create)

router.post('/store', productController.store)

router.get('/:id/edit', productController.edit);

router.post('/handle-form-actions', productController.handerFormActions);

router.put('/:id', productController.update);

router.delete('/:id', productController.delete);

router.patch('/:id/restore', productController.restore)

router.delete('/:id/force', productController.forceDelete)

router.get('/:slug', productController.checkout);

router.post('/api/update-payment-status', productController.handlerFormUpdatePayment)




module.exports = router