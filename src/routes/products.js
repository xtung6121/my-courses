const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const productController = require('~/controllers/ProductController')

router.get('/create', productController.create)
router.post('/store', productController.store)
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/:slug', productController.show);
// router.get('/product/:id/edit', courseController.edit) 
// router.post('/product/handle-form-actions', courseController.handleFormActions)
// router.put('/product/:id', courseController.update)
// router.patch('/product/:id/restore', courseController.restore)
// router.delete('/product/:id', courseController.delete)
// router.delete('/product/:id/force', courseController.forceDelete)


module.exports = router