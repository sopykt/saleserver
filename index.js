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


//byethost sql
/*var con = mysql.createConnection({
  host: "sql100.byethost7.com",
  user: "b7_19863613",
  password: sqlpwd,
  database: "b7_19863613_o463"
});
*/

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  } else {
	console.log('Connection to DB established');
	//execute a query against the database table employees
	
  }
});


//execute a query against the database table employees
/*
con.query('UPDATE tbl_doctors SET name = ? WHERE id = 1', ['စိုးပိုင်'], function(err, result)	{
		if(err) {
			console.log('error updating name');
		} else {
			console.log('Changed ' + result.changedRows + ' rows');
		}
	});  
*/

//insert query against a database

var adoctor = { name: 'soe', designation: 'micro', day: 'monday', start_time: '0800', end_time: '1500' };
con.query('INSERT INTO tbl_doctors SET ?', adoctor, function(err,res){
  if(err) {
	  console.log('error inserting new doctor');
	  } else {
		console.log('Last insert ID:', res.insertId);
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

