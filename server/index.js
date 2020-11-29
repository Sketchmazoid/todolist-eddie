const express = require("express");
const path = require('path');
const dbClient = require('./db-client');
const initDb = require('./init-db');
const app = express();



app.use(express.json()); //instead of body-parser

const port = process.env.PORT || 8080; // Heroku provides a PORT environment variable, locally we'll listen on port 8080


// fetch the lists and their associates items
function read(id, respond) {
    dbClient.query(`
      SELECT lists.name, items.body, lists.id FROM lists LEFT JOIN items ON lists.id = items.list_id;
    `, (err, res) => {
        console.log(res.rows)
        respond.json(
            res.rows.reduce((obj, categories) => {
                if (!(categories.name in obj)) {
                    obj[categories.name] = {
                        id: categories.id,
                        items: []
                    }
                }
                categories.body && obj[categories.name].items.push(categories.body)


                return obj
            }, {})
        )

    })
};

// here we tell the server that for localhost:2226/ we serve the content of ./../client
app.use("/", express.static(__dirname + '/../client'));

//app.set('view engine','html');

//opens register page

app.get('/users/register', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/register.html'));
});

//opens login page

app.get('/users/login', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/login.html'));
});

//opens dashboard

app.get('/users/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/dashboard.html', { user: 'eddie' }));
});

// You need to fetch the lists and their associates items
app.get('/lists', (req, res) => read(userId, res));
// Get all the items from the database
// dbClient.query(...)
// The SQL SELECT can be made in several ways, you could just get all the rows from the items table and make a join in order to retrieve the list name and then iterate through all the results in order to get an array like the one below
// You could also get all the lists, and iterate through the lists, and for each one, make another request to SELECT * FROM items WHERE list_id = (the id of the list in the iteration)
// should return something with this shape:
/*
[{
    id: 1,
    name: 'todolist',
    items: [{id:1, body:'item'}]
}];
*/



app.post("/category", (req, respond) => {
    console.log(req.body);
    dbClient.query(`INSERT INTO categories(name,user_id) VALUES('${req.body.list}',${userId})`, (err, res) => read(userId, respond))
});

// Here you'll submit an item to a list
// dbClient.query(INSERT INTO...)
// Retrieve the list id from our URL path

app.delete('/item/:id', (req, res) => {
    // endpoint used to delete an item
})

//Tell the server to listen on the given port
module.exports = {
    start: () => {
        initDb();
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }
}