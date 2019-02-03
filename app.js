var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var formidable = require('formidable')
var http = require('html')
var mysql = require('mysql')
var upload = require('./routes/upload.js')
//var upload = require('./routes/upload.js') //업로드 파일 저장경로

var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'dev',
	password : 'qwe123',
	database : 'mydev'
})
connection.connect();

app.listen(3000, function(){
	console.log("Start!! express server on port 3000");
});

app.use('/upload',upload)
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use('/users', express.static('uploads'))

app.get('/', function(req,res){
	//res.send("<h1>hi world!</h1>")
	res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req,res){
	res.sendFile(__dirname + "/public/main.html")
})

app.post('/form_post', function(req, res){
	console.log(req.body.email)
	//res.send("<h1>Welcome " + req.body.email + "</h1>")
	res.render('order.ejs', {'email': req.body.email})
	//res.send("post response")
})


/*
app.post('/ajax_send_email',function(req, res){
	console.log(req.body.email);
	var responseData = {'result' : 'ok', 'email' : req.body.email}
	res.json(responseData);
*/
app.post('/ajax_send_search', function(req, res){
	console.log(req.body.keyword);
	//res.send("<h1>" + req.body.keyword + "</h1>")
	var responseData = {'result' : 'ok', 'keyword' : req.body.keyword}
	res.json(responseData);
})

app.post('/ajax_send_email', function(req, res){
	var email = req.body.email;
	var responseData = {};
	var sql = 'select * from USER_INFO';
	var query = connection.query(sql, function(err, rows, fields){
		if(err){
			console.log(err);
				}else{
				for(var i=0; i<rows.length; i++){
					console.log(row[i].USER_ID);
				}
		//console.log(res.query);
		//if(row[0]){
			//console.log(rows[0]);
			//responseData.result = "ok";
		//	responseData.USER_ID = rows[0].USER_ID;

		//	console.log('none :' + rows[0])
		//console.log('rows', rows);
		//console.log('fields', fields);
		}
	})
	//res.json(responseData)
})
