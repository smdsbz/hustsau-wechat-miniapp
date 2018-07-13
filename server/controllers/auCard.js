const { mysql } = require('../qcloud');

module.exports = async(ctx) =>{
  /**
   * insert data into my_sql database, table:"au_card"
   *
   * NOTE: the structure can be seen at Tencent Cloud
   *     site: https://itxbu0dx.qcloud.la/phpmyadmin/
   *
   * Args:
   * ctx  - the context sent to the server
   *
   * Return:
   * ctx.response.error - json data that contains error
   *                      message, can be found in client-side
   *                      at data.console.error
   * ctx.status         - status code is defined as...
   *                         0 - identity validated
   *                         200 - application submitted
   *                         900 - unable to validate: under scrutiny
   *                         901 - unable to validate: incorrect info
   *                         902 - unable to validate: unxepected error
   */
  return new Promise((resolve, reject) => {

    let new_data = {
      student_id: ctx.request.body["student-id"],
      name: ctx.request.body.name,
      association: ctx.request.body.association,
      check_status:1
    };

    mysql('au_card').select('check_status', 'name', 'association').where('student_id', '=', new_data.student_id)
    //NOTE:returns an array, the first element of which is a dictionary!
      .then((r) => {
        if (!r.length){
          return mysql('au_card').insert(new_data);
        }
        else if (r[0].check_status == 1){
            reject({ code: 900, data: 'under scrutiny!' });
          }
        else if (r[0].check_status == 2){
            if (r[0].name == new_data.name && r[0].association == new_data.association){
              resolve({
                code: 0,
                data: "association membership verified!"
              });
            }
            else{
              reject({ code: 902, data: 'incorrect info!' });
            };
          }

        // if (check_status == 2){
        //   resolve({
        //   code: 200,
        //   data: "association membership verified!"
        // });
        // }
        // else if (check_status == 1) {
        //   reject({ code: 900, data: 'under scrutiny!' });
        // }
        // else if (!check_status.length) {
        // return mysql('au_card').insert(new_data);}
      //   if (check_status == 1)
      //   {
      //     reject({ code: 900, data: 'under scrutiny!' });
      //   }
      })
      .then(() => {
        resolve({
          code: 200,
          data: "application submit!"
        });
      })
      .catch(err => {
        reject({ code: 901, data: 'unexpeted error' });
      });

  });


};
