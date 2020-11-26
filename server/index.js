const express = require("express");
const { Pool } = require("pg");
const path = require('path');
const app = express();



app.use(express.json());//instead of body-parser

const port = 2226;


//connects page to postgresql database host

//const pool = new Pool({
//    user: 'user',
//    host: 'postgresql-15535-0.cloudclusters.net',
//    database: 'userList',
//    password: 'testPass',
//    port: 15535,
//}
//);


// here we tell the server that for localhost:2226/ we serve the content of ./../client
app.use("/", express.static(__dirname + '/../client'));

//app.set('view engine','html');

//opens register page

app.get('/users/register',(req, res)=>{
    res.sendFile(path.resolve(__dirname + '/../client/register.html')); 
});

//opens login page

app.get('/users/login',(req, res)=>{
    res.sendFile(path.resolve(__dirname + '/../client/login.html')); 
});

//opens dashboard

app.get('/users/dashboard',(req, res)=>{
    res.sendFile(path.resolve(__dirname + '/../client/dashboard.html',{user: 'eddie'}));
});




//checks if the server is running.
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})