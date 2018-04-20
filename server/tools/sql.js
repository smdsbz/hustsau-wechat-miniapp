exports.insert_into_form = function(){
var mysql      = require('mysql');
var logdata = "empty";
var connection = mysql.createConnection({
  host: 'itxbu0dx.qcloud.la',
  port: 3306,
  user: 'root',
  database: 'application_form',
  password: '1qaz2wsx3edc'
  // host     : 'localhost',
  // user     : 'me',
  // password : 'secret',
  // database : 'my_db'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    // logdata = "connection error";
    return;
  }

  console.log('connected as id ' + connection.threadId);
  // logdata = "connection success";
  return 'connected as id ';
});

var  addSql = 'INSERT INTO join_us(idx, name, gender, mobile, first-departmet-choice) VALUES(NULL, ?, ?, ?, ?, ?)';
var  addSqlParams = ['测试', 'male', '18200000000', '思存工作室'];

connection.query(addSql, addSqlParams, function (err, result) {
  if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }

  console.log('INSERT ID:', result.insertId);
  return 'INSERT ID:' + result.insertId;
});

connection.end();
return logdata;
}
