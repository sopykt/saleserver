'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const serveStatic = require('serve-static')
const mysql = require('mysql')
const sqlpwd = (process.env.MySQL_PASSWORD)

// set port for server to serve
app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

//servestatic for assets
app.use(serveStatic(__dirname + '/public', {
  maxAge: '1d',
  setHeaders: setCustomCacheControl
}))

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}

//Create connection to mysqlserver
var con = mysql.createConnection({
  host: "db4free.net",
  user: "sopykt",
  password: sqlpwd,
  database: "saleserver"
});

/*
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  } else {
	console.log('Connection to DB established');
	//execute a query against the database table employees
	
  }
});
*/

//execute a query against the database table employees
con.query('SELECT * FROM employees',function(err, rows){
		if(err) {
			console.log('error getting query from database');
		} else {
			console.log(rows);
		}
	});  

/*
con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
*/


// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

