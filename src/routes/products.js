const express = require('express')
const router = express.Router()

const productController = require('~/controllers/ProductController')

router.get('/create', productController.create)
router.get('/:slug', productController.show)
// router.post('/product/store', courseController.store)
// router.get('/product/:id/edit', courseController.edit)
// router.post('/product/handle-form-actions', courseController.handleFormActions)
// router.put('/product/:id', courseController.update)
// router.patch('/product/:id/restore', courseController.restore)
// router.delete('/product/:id', courseController.delete)
// router.delete('/product/:id/force', courseController.forceDelete)


module.exports = router