const addFormToDB = require('../controllers/addFormToDB.js');
const auCard = require('../controllers/auCard.js');
/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/api'
});
const controllers = require('../controllers');

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
// const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud');





// smdsbz: test url
router.get('/app-form', async (ctx, next) => {
  // -------------------------
  ctx.response.body = 'Successfully reached the page `/app-form` !';
  // -------------------------
});


// router.get('/app-form', async function (ctx, next) {
//   ctx.response.body = func(ctx);
// });

// router.get('/demo', controllers.demo);
// router.get('/sql', controllers.my_sql);



router.post('/app-form', async (ctx, next) => {
  let retval = addFormToDB(ctx)
    .then((retval) => {
      console.log(retval);
      return retval;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  ctx.response.body = await retval;
});

router.post('/au-card', async (ctx, next) => {
  let retval = auCard(ctx)
    .then((retval) => {
      console.log(retval);
      return retval;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  ctx.response.body = await retval;
});



// --- 登录与授权 Demo --- //
// 登录接口
// router.get('/login', authorizationMiddleware, controllers.login)
// router.get('/login', async (ctx, next) => {
//   ctx.response.body = 'Hello, World!';
// });
// 用户信息接口（可以用来验证登录态）
// router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
// router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
// router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
// router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
// router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
// router.post('/message', controllers.message.post)

module.exports = router
