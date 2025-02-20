const { validationResult, body } = require('express-validator')
const Course = require('~/models/Course')
const { mongooseToObject } = require('~/utils/mongoose')
const User = require('~/models/User/User');


class ProductController {

  get500(req, res, next) {
    res.status(500).render('500', {
      pageTitle: 'Server Error',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn,
    });
  }
  //GET/ products/:slug
  checkout(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(product => {
        res.status(200).render('courses/checkout', {
          product: mongooseToObject(product),
          isAuthenticated: req.session.isLoggedIn
        })
      })
      .catch(err => {
        console.error('Error searching for products:', err);
        res.status(500).redirect('/500');
      })
  }
  // [GET]/courses/create
  create(req, res, next) {
    res.render('courses/create', {
      isAuthenticated: req.session.isLoggedIn
    })

  }
  // [POST]/products/store
  store(req, res, next) {
    const { title, price, description } = req.body; // Destructure the properties from req.body
    const image = req.file;

    if (!image) {
      return res.status(422).render('courses/create', {
        pageTitle: 'Add Product',
        editing: false,
        hasError: true,
        product: {
          title,
          price,
          description,
        },
        errorMessage:
          'File type not supported. Please upload a JPEG, JPG, or PNG image file.',
        validationErrors: [],
      });
    }
    const errors = validationResult(req);
    const imageUrl = req.file.location;
    console.log(imageUrl);
    const imageKey = req.file.key;

    const product = new Course({
      title,
      price,
      description,
      imageUrl,
      imageKey,
      userId: req.user, // Assuming req.user exists and contains the user ID
    });
    product.slug = req.body.title; // You could also use the destructured title: product.slug = title;

    product
      .save()
      .then(() => res.redirect(303, '/me/stored/courses')) // Use a valid status code, e.g., 303
      .catch(err => {
        console.error('Error creating product:', err);
        res.status(500).redirect('/500'); // Ensure that /500 route exists and handles the error page
      });
  }

  // [GET]/products/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(product => {
        res.status(200).render('courses/edit', {
          product: mongooseToObject(product),
          // isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => {
        console.error('Error searching for products:', err);
        res.status(500).redirect('/500'); // Ensure that /500 route exists and handles the error page
      });
  }


  // [PUT]/products/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).redirect('/me/stored/courses'))
      .catch(err => {
        console.error('Error updating product:', err);
        res.status(500).redirect('/500');
      });
  }
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.location(req.get('back')).status(302).end())
      .catch(err => {
        console.error('Error deleting product:', err);
        res.status(500).redirect('/500');
      });
  }
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.location(req.get('back')).status(302).end())
      .catch(err => {
        console.error('Error force deleting product:', err);
        res.status(500).redirect('/500');
      });
  }

  // [PATCH] /products/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.location(req.get('back')).status(302).end())
      .catch(err => {
        console.error('Error restoring product:', err);
        res.status(500).redirect('/500');
      });
  }


  // [POST] /products/handle-form-actions
  handerFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.productIds } })
          .then(() => res.location(req.get('back')).status(302).end())
          .catch(next);
        break; // Add break statement

      case 'forceDelete':
        Course.deleteMany({ _id: { $in: req.body.productIds } })
          .then(() => res.redirect("/me/trash/courses"))
          .catch(next);
        break; // Add break statement

      case 'recover':
        Course.restore({ _id: { $in: req.body.productIds } })
          .then(() => res.redirect("/me/trash/courses"))
          .catch(next);
        break; // Add break statement

      default:
        res.status(400).json({ message: 'Action is invalid!' });
        break; // Add break statement
    }
  }


  getCart(req, res, next) {
    User.findById(req.user._id)
      .populate('cart.items.productId')
      .exec() // Optional based on Mongoose version 
      .then(user => {
        const products = user.cart.items.map(item => item.toObject());
        res.render('courses/cart', { products, });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  }

  postCart(req, res, next) {
    const prodId = req.body.productId;
    console.log(prodId)

    Course.findById(prodId)
      .then((product) => {
        return req.user.addToCart(product);
      })
      .then((result) => {
        res.redirect('/products/cart');
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  }

  // [POST]: /products/cart-delete-item
  postCartDeleteProduct(req, res, next) {
    const prodId = req.body.productId;
    req.user
      .removeFromCart(prodId)
      .then((result) => {
        res.redirect('/products/cart');
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  }

  handlerFormUpdatePayment(req, res, next) {
    const { userId, productId, amount } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!userId || !productId || !amount) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc: userId, productId, hoặc amount' });
    }

    // Kiểm tra số tiền hợp lệ
    if (isNaN(amount)) {
      return res.status(400).json({ message: 'Số tiền không hợp lệ' });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    User.findById(userId, (err, user) => {
      if (err) {
        console.error('Lỗi khi tìm người dùng:', err);
        return res.status(500).json({ message: 'Lỗi server' });
      }

      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }

      // Cập nhật số tiền vào tài khoản của người dùng
      user.balance += parseFloat(amount); // Đảm bảo amount là số
      user.purchasedProducts.push(productId); // Thêm sản phẩm vào danh sách đã mua

      // Lưu thay đổi
      user.save((err, updatedUser) => {
        if (err) {
          console.error('Lỗi khi lưu thay đổi:', err);
          return res.status(500).json({ message: 'Lỗi server' });
        }

        // Trả về phản hồi thành công
        res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
      });
    });
  };
}


module.exports = new ProductController();