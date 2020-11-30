const express = require("express");
const path = require('path');
const dbClient = require('./db-client');
const initDb = require('./init-db');
const app = express();



app.use(express.json()); //instead of body-parser

const port = process.env.PORT || 3000; // Heroku provides a PORT environment variable, locally we'll listen on port 8080



// here we tell the server that for localhost:8080/ we serve the content of ./../client
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

// fetch the lists and their associates items
app.get('/lists', (req, res) => {
    let categories = [];
    const selectCategoriesQuery = "SELECT * FROM categories";
    const itemPromises = [];
    dbClient.query(selectCategoriesQuery).then(data => {
        categories = data.rows;

        categories.forEach(category => {
            const selectItemsQuery = `SELECT * FROM items WHERE category_id = ${category.id}`;
            itemPromises.push(dbClient.query(selectItemsQuery));
        });
        Promise.all(itemPromises).then((data) => {
            categories.forEach((c, i) => {
                c.items = data[i].rows;
            });
            console.log(categories);
            res.json(categories);
        });

    }).catch();
});
// should return something with this shape:
/*
[{
    id: 1,
    name: 'todolist',
    items: [{id:1, body:'item'}]
}];
*/



app.post("/category", (req, respond) => {
    // here we insert a new category
    // we need the name and a user id
    // For now user id will always be 1
    // we want our req.body to contain {name: 'nameofthecategory'}
    console.log(req.body);
    dbClient.query(`
                                    INSERT INTO categories(name, user_id) VALUES('${req.body.name}', 1) RETURNING id `, (whatever, res) => {
        // the returned id is located in res.rows[0].id

        respond.json({ id: res.rows[0].id });
    })
});

// submit an item to a list
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
            console.log(` App listening on port ${ port }`);
        });
    }
}