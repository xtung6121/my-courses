module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    next();
    // if (req.user == null) {
    //     res.status('403')
    //     return res.send('Bạn cần đăng nhập trước !')
    // } else {
    //     return next()
    // }
};


