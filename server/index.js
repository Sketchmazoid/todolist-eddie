const { Router } = require("express");
const express = require("express");
const path = require('path');
const { Pool } = require("pg");
const app = express();



app.use(express.json());//instead of body-parser

const port = 2226;


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

app.get('/db', async (req,res)=>{
    try{
        const client = await Pool.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = {'results': (result) ? result.rows : null};
        res.render(results);
        client.release();
        
} catch (err){
    console.error(err);
    res.send("error" + err);
}
});




//checks if the server is running.
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})