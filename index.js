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

/*
Route           /authors
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/

shapeAI.get("/authors", (req,res) => {
    return res.json({authors: database.authors});
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/

shapeAI.get("/publications", (req,res) => {
    return res.json({publications: database.publications});
});

/*
Route           /is/:ISBN
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      ISBN
Method          GET
*/

shapeAI.get("/is/:ISBN", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.ISBN);

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the ISBN of
         ${req.params.ISBN}`});
    }
    return res.json({BookByISBN: getSpecificBook});
});

/*
Route           /author/about/:id
Description     get specific author based on id
Access          PUBLIC
Parameters      id
Method          GET
*/

shapeAI.get("/author/about/:id", (req,res) => {
    const getSpecificAuthor = database.authors.filter(
        (author) => author.id == req.params.id);

    if(getSpecificAuthor.length === 0) {
        return res.json({error: `No author found for the id of
         ${req.params.id}`});
    }
    return res.json({AuthorByID: getSpecificAuthor});
});

/*
Route           /c/:category
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/

shapeAI.get("/c/:category", (req,res) => {
    const getSpecificBooks = database.books.filter(
        (book) => book.Category.includes(req.params.category));
        //includes(): searches for the passed value within the array

    if(getSpecificBooks.length === 0) {
        return res.json({error: `No book found for the category
         of ${req.params.category}`});
    }
    return res.json({BooksByCategory: getSpecificBooks});
});

/*
Route           /author/:author
Description     get specific books based on an author
Access          PUBLIC
Parameters      author
Method          GET


shapeAI.get("/author/:author", (req,res) => {
    const getSpecificBooks = database.books.filter(
        (book) => book.Category.includes(req.params.category));
        //includes(): searches for the passed value within the array

    if(getSpecificBooks.length === 0) {
        return res.json({error: `No book found for the category
         of ${req.params.category}`});
    }
    return res.json({BooksByCategory: getSpecificBooks});
});
*/

/*
Route           /author/:isbn
Description     get specific authors based on isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/

shapeAI.get("/author/:isbn", (req,res) => {
    const getSpecificAuthors = database.authors.filter(
        (author) => author.books.includes(req.params.isbn));

    if(getSpecificAuthors.length === 0) {
        return res.json({error: `No author found for this book 
        ${req.params.isbn}`});
    }
    return res.json({AuthorsByISBN: getSpecificAuthors});
});

/*
Route           /publications/:isbn
Description     get specific publication based on isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/

shapeAI.get("/publications/:isbn", (req,res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.books.includes(req.params.isbn)); 

    if(getSpecificPublication.length === 0) {
        return res.json({error: `No publication found for this book 
        ${req.params.isbn}`});
    }
    return res.json({PublicationByISBN: getSpecificPublication});
});

shapeAI.listen(3000, () => console.log("Server running!!"));