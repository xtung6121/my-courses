const { mutipleMongooseToObject } = require('~/utils/mongoose');
const Course = require('~/models/Course');

const ITEMS_PER_PAGE = 3

class SiteController {
  index(req, res, next) {
    const page = +req.query.page || 1;
    let totalItems;

    Course.find({})
      .countDocuments()
      .then((numProducts) => {
        totalItems = numProducts
        return (
          Course.find()
            // To sort in descending order (newest at top of list)
            // .sort({ _id: -1 })
            // skip MongoDB and therefore Mongoose method skips first x amt of results and is called on a cursor. find() is an object that returns a cursor, an object that enables iterating through documents of a collection
            .skip((page - 1) * ITEMS_PER_PAGE)
            // Only fetch amt of items to display on current page
            .limit(ITEMS_PER_PAGE)
        );
      })

      .then(product => {
        res.render('home', {
          product: mutipleMongooseToObject(product),
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        })
      })
      .catch(next)
  }

  search(req, res) {
    res.render('search')
  }
  postSearch(req, res, next) {
    const searchQuery = req.body.query;

    // Kiểm tra xem searchQuery có hợp lệ không
    if (!searchQuery || typeof searchQuery !== 'string') {
      return res.status(400).send('Invalid search query');
    }

    // Sanitize searchQuery để ngăn ngừa injection
    const sanitizedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Tạo biểu thức chính quy một cách an toàn
    const regex = new RegExp(sanitizedQuery, 'i');

    // Thực hiện tìm kiếm trong cơ sở dữ liệu
    Course.find({ title: regex })
      .then(product => {
        res.render('search-results', { product });
      })
      .catch(err => {
        console.error('Error searching for products:', err);
        res.status(500).redirect('/500');
      });
  }
}

module.exports = new SiteController