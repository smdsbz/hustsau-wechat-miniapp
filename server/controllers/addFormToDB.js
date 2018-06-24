const { mysql } = require('../qcloud');


module.exports = async (ctx) => {
  /**
   * insert data into my_sql database, table:"join_us"
   * 
   * NOTE: the structure can be seen at Tencent Cloud
   *     site: https://itxbu0dx.qcloud.la/phpmyadmin/
   *
   * Author:  star-du@github
   *
   * Args:
   * ctx  - the context sent to the server
   *
   * Return:
   * ctx.response.error - json data that contains error
   *                      message, can be found in client-side
   *                      at data.console.error
   * ctx.status         - status code is defined as...
   *                          900 - unable to insert
   * ctx.state.data     - json data(array) that contains the
   *                      `index` of the latest item that is inserted
   */


  return new Promise((resolve, reject) => {

    let new_data = {
      idx: null,
      name: ctx.request.body.name,
      gender: ctx.request.body.gender,
      mobile: ctx.request.body.mobile,
      "first-department-choice": ctx.request.body["first-department-choice"],
      // 以下为非必填项
      apartment: ctx.request.body.apartment,
      birthday: ctx.request.body.birthday,
      "birth-place": ctx.request.body["birth-place"].join(),
      //birth-place is an array
      email: ctx.request.body.email,
      expectations: ctx.request.body.expectations,
      "faculty-and-class": ctx.request.body["faculty-and-class"],
      "former-experience": ctx.request.body["former-experience"],
      hobbies: ctx.request.body.hobbies,
      "first-department-choice": ctx.request.body["first-department-choice"],
      "self-explanation": ctx.request.body["self-explanation"],
      "student-id": ctx.request.body["student-id"]
    };

    mysql('join_us').select('name').where('mobile', '=', new_data.mobile)
      .then(names => {
        if (names.length) {
          reject({ code: 900, data: 'duplicate mobile!' });
        }
        return mysql('join_us').insert(new_data);
      })
      .then(() => {
        return mysql('join_us').max('idx').first();
      })
      .then(index => {
        console.log(index);
        resolve({
          code: 200,
          data: index
        });
      })
      .catch(err => {
        reject({ code: 901, data: 'unexpeted error' });
      });

  });


};