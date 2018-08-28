/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

//var host = "https://itxbu0dx.qcloud.la"
//上面是生产环境的host
var host = "https://106303093.sicun.xyz"
// smdsbz: 我们可以把上面的 `host` 设置成 `127.0.0.1`，
//         在本机回环端口上跑 *RESTful* 数据后台服务，方便开发

var config = {

    // 下面的地址配合云端 Server 工作
    // host: host,

    // 登录地址，用于建立会话
    // loginUrl: `https://${host}/login`,

    // 测试的请求地址，用于测试会话
    // requestUrl: `https://${host}/testRequest`,

    // 用code换取openId
    // openIdUrl: `https://${host}/openid`,

    // 测试的信道服务接口
    // tunnelUrl: `https://${host}/tunnel`,

    // 生成支付订单的接口
    // paymentUrl: `https://${host}/payment`,

    // 发送模板消息接口
    // templateMessageUrl: `https://${host}/templateMessage`,

    // 上传文件接口
    // uploadFileUrl: `https://${host}/upload`,

    // 下载示例图片接口
    // downloadExampleUrl: `https://${host}/static/weapp.jpg`,

    // 试验用数据库
    // database: "application-forms",
    // username: "admin",
    // password: "drowssap",
    // host: "localhost",
    // port: 3306

    // MySQL - application_form
    database: 'application_form',
    username: 'root',
    password: '1qaz2wsx3edc',
    //database_host: 'https://itxbu0dx.qcloud.la',
    database_host: 'https://106303093.sicun.xyz',
    port: 3306

};

module.exports = config
