const express=require("express");

const database = require("./database/index");

//Initializing express
const shapeAI = express();

//Configurations
shapeAI.use(express.json());

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/

shapeAI.get("/", (req,res) => {
    return res.json({books: database.books});
});

shapeAI.get("/authors", (req,res) => {
    return res.json({authors: database.authors});
});

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      isbn
Method          GET
*/

shapeAI.get("/is/:ISBN", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.ISBN);

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the ISBN of
         ${req.params.ISBN}`});
    }
});

/*
Route           /category/
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/

shapeAI.get("/c/:Category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.Category.includes(req.params.Category));

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the category
         of ${req.params.Category}`});
    }
});

shapeAI.get("/author/:isbn", (req,res) => {
    const getSpecificAuthors = database.authors.filter(
        (author) => author.books.includes(req.params.ISBN));

    if(getSpecificAuthors.length === 0) {
        return res.json({error: `No author found for this book 
        ${req.params.ISBN}`});
    }
});

shapeAI.get("/publications", (req,res) => {
    
});

shapeAI.listen(3000, () => console.log("Server running!!"));