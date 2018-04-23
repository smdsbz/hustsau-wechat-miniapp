const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  var new_data = {
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
  }
  await mysql("join_us").insert(new_data).catch(error =>{
    console.error(error);
    ctx.body = {
            error: "unable to insert =>"+error
        };
    ctx.status = 404;
    ctx.response.error = { message: "Unable to insert into database"};
    // the error handling isn't working as I expected, maybe https://github.com/koajs/koa/issues/803
  })

  res = await mysql('join_us').max('idx')
  // retrun the index of the latest record

  // // 改
  // await mysql("Book").update({ price: 66 }).where({ id })
  // // 删
  // await mysql("Book").del().where({ id })

  ctx.state.data = {
       msg: res
   }
}
