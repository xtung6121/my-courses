const express = require('express')
const router = express.Router()
const productController = require('~/controllers/ProductController')

router.get('/create', productController.create)
router.post('/store', productController.store)
router.get('/:id/edit', productController.edit);
router.post('/handle-form-actions', productController.handerFormActions);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.patch('/:id/restore', productController.restore)
router.delete('/:id/force', productController.forceDelete)
router.get('/:slug', productController.show);



module.exports = router