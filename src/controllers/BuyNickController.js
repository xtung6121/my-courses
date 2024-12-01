const Course = require('~/models/Course')
const { mongooseToObject } = require('~/utils/mongoose')
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const { mutipleMongooseToObject } = require('~/utils/mongoose');

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};
// app.use(bodyParser.json());

class BuyNickController {

  index(req, res, next) {
    Course.find({})
      .then(product => {
        res.render('courses/payment', {
          product: mutipleMongooseToObject(product)
        })
      })
      .catch(next)
  }
  getProduct(req, res, next) {
    Course.findById({ _id: req.params.id })
    res.send('hello')
  }
  payment(req, res, next) {
    const embed_data = {
      taiKhoan: `${storage.taikhoan}`,
      matKhau: `${storage.matkhau}`,
      matKhauC2: `${storage.matkhauc2}`,
    };

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: "user123",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 50000,
      callback_url: 'https://b074-1-53-37-194.ngrok-free.app/callback',
      description: `ShopAccTomy.Com - Payment for the order #${transID}`,
      bank_code: "",
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const result = axios.post(config.endpoint, null, { params: order })
      console.log(result.data)
    } catch (error) {
      console.log(error.message)
    }
    res.send('payment with zalo')
  }
}

module.exports = new BuyNickController();