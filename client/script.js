//gets information from input
//function category(){
//
//    let newList = document.getElementById("category").value;
//    console.log(newList);
//   
//    
//};

/*fetch('/mytodolist')
    .then(res => res.json())
    .then(data => createCategory(data))*/


let categories = [];

fetch('/lists')
    .then(res => res.json())
    .then(data => {
        categories = data;
        displayCategories();
    }).catch(err => {
        console.log(err);
    });

//creates html elements for the Categories
const categoriesContainer = document.createElement('div');
categoriesContainer.id = 'categories';

//appends category
document.querySelector('.lists').appendChild(categoriesContainer);

//creates a new category
function createCategory() {

    const category = { name: document.getElementById("category").value, items: [] };
    fetch('/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: category.name
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log({...category, id: data.id });
            // we will use the data we already have and add the id returned by the server
            categories.push({...category, id: data.id });
            displayCategories();
        });
}

/* non psql version

function createCategory() {

    // add the category to the categories array
    categories.push({ name: document.getElementById("category").value, items: [] });

    displayCategories();
};

*/

function displayCategories() {
    // empty the container
    categoriesContainer.innerHTML = '';
    console.log("categories", categories);
    const ul = document.createElement('ul');
    // We iterate through all categories, each category will be referred as "c" in the forEach loop
    categories.forEach(c => {
        // The li element will hold a category
        const categContainer = document.createElement('li');
        // adds css identifier to category
        categContainer.className = 'categContainer';
        // The ul element will holds the items in this category
        const categItems = document.createElement('ul');
        // adds css identifier to category items
        categItems.className = 'categItems';
        // This is the button used to add an item to the category
        const Cbutton = document.createElement('button');
        // adds css identifier to button
        Cbutton.className = 'newItemButton';
        Cbutton.innerText = '+';
        Cbutton.onclick = addItemOrInput.bind(c); // bind tells the callback function what "this" will refer to
        // Element to display category name
        const Cdelete = document.createElement('button')
        Cdelete.className = 'deleteListButton';
        Cdelete.innerText = '-';
        //const deleted = Cdelete.onclick = categories.splice('item');
        const Cname = document.createElement('span');
        Cname.innerText = c.name;

        categContainer.appendChild(Cname);
        // Display each item in this category
        c.items.forEach(item => {
                const itemLi = document.createElement('li');
                itemLi.attributes.id = 'item-' + item.id; // you can later retrieve the id by using split('-')
                itemLi.innerText = item.body;
                categItems.appendChild(itemLi);
                itemLi.appendChild(Cdelete);
            })
            // add the items to the category
        categItems.appendChild(Cbutton);
        // Add the + button at the end of the list
        categContainer.appendChild(categItems);
        ul.appendChild(categContainer);

        categoriesContainer.appendChild(ul);
    })
};


function addItemOrInput(event) {
    // "this" will reference the category instance, and event is the click event
    // check if input is present
    const input = event.target.parentNode.querySelector('input');
    // if input is already here, add an item
    if (input) {
        newListitem(this, input.value);
    } else {
        // Input of the category, used to add item
        const Cinput = document.createElement('input');
        event.target.parentNode.insertBefore(Cinput, event.target);

    }
}


function newListitem(category, item) {
    // then add the item to the category
    category.items.push(item);
    // finally we need to re render the categories with the new item
    displayCategories();
};


// Initial display of the categories
displayCategories();

//delete list item




//creates list input and list items
// Shouldn't this object hold an array ?
/*
function List(name){
    this.items = [];
    this.name = name;
    this.addItem = function(item){
        this.items.push(items)
    }
}
const myList = new List("Yay");
const item = "Eat";
myList.push(item) ?

Does a category hold multiple lists ?

In theory this is what I want to do but for now I'm trying to get it to hold
one list with an input field where I can fill in list items.
*/

//function createNewItem(){
//
////create input field
//const newItem = document.createElement('input');
//newItem.type = "text";
//newItem.class = "newItem"; 
//
//newItem.push();
//
//}
//
//console.log(createNewItem())