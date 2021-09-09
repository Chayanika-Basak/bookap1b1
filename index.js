require("dotenv").config();
const express=require("express");
const mongoose = require("mongoose");

const database = require("./database/index");

//Initializing express
const shapeAI = express();

//Configurations
shapeAI.use(express.json());

//Establish database connection
mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("Connection Established!!"));

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
Route           /author/books/:id
Description     get specific books based on an author
Access          PUBLIC
Parameters      id
Method          GET

*/

shapeAI.get("/author/books/:id", (req,res) => {

    let AuthorList, BookList = [];

    database.books.forEach((book) =>
    {
        AuthorList = book.authors.filter(
            (author) => author == req.params.id);
        if(AuthorList.length!=0) BookList.push(book);
    });

    if(BookList.length === 0) {
        return res.json({error: `No book found for the author
         of id ${req.params.id}`});
    }
    return res.json({BooksByAuthor: BookList});
});


/*
Route           /authors/:isbn
Description     get specific authors based on isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/

shapeAI.get("/authors/:isbn", (req,res) => {
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

shapeAI.get("/book/publications/:isbn", (req,res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.books.includes(req.params.isbn)); 

    if(getSpecificPublication.length === 0) {
        return res.json({error: `No publication found for this book 
        ${req.params.isbn}`});
    }
    return res.json({PublicationByISBN: getSpecificPublication});
});

/*
Route           /publications/:id
Description     get specific publication based on id
Access          PUBLIC
Parameters      id
Method          GET
*/

shapeAI.get("/publications/:id", (req,res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.id == req.params.id); 

    if(getSpecificPublication.length === 0) {
        return res.json({error: `No publication found having id
        ${req.params.id}`});
    }
    return res.json({Publication: getSpecificPublication});
});

/*
Route           /book/new
Description     Add new Book
Access          PUBLIC
Parameters      NONE
Method          POST

*/

shapeAI.post("/book/new", (req,res) =>
{
    const { newBook } = req.body;

    database.books.push(newBook);

    return res.json({books : database.books, message: "book was added!!"});
});

/*
Route           /author/new
Description     Add new Author
Access          PUBLIC
Parameters      NONE
Method          POST

*/

shapeAI.post("/author/new", (req,res) =>
{
    const { newAuthor } = req.body;

    database.authors.push(newAuthor);

    return res.json({authors : database.authors, message: "Author was added!!"});
});

/*
Route           /publication/new
Description     Add new Publication
Access          PUBLIC
Parameters      NONE
Method          POST

*/

shapeAI.post("/publication/new", (req,res) =>
{
    const { newPublication } = req.body;

    database.publications.push(newPublication);

    return res.json({publications : database.publications, message: "Publication was added!!"});
}); 

/*
Route           /book/update/:isbn
Description     Update book details
Access          PUBLIC
Parameters      isbn
Method          PUT

*/

shapeAI.put("/book/update/:isbn", (req,res) =>
{
    database.books.forEach((book) =>
    {
        if(book.ISBN === req.params.isbn)
        book.title = req.body.bookTitle;
        return;
    });

    return res.json({books: database.books});
});

/*
Route           /book/author/update/:isbn
Description     Update/Add new Author
Access          PUBLIC
Parameters      isbn
Method          PUT

*/

shapeAI.put("/book/author/update/:isbn", (req,res) =>
{
    database.books.forEach((book) =>
    {
        if(book.ISBN === req.params.isbn)
        return book.authors.push(req.body.newAuthor);
    });

    database.authors.forEach((author) =>
    {
        if(author.id === req.body.newAuthor) 
        return author.books.push(req.params.isbn);
    });

    return res.json({books: database.books, authors: database.authors, message: "New Author was added"});
});


/*
Route           /author/update/:id
Description     Update author name using id
Access          PUBLIC
Parameters      id
Method          PUT

*/

shapeAI.put("/author/update/:id", (req,res) =>
{
    database.authors.forEach((author) =>
    {
        if(author.id == req.params.id)
        author.name = req.body.authorName;
        return;
    });

    return res.json({authors: database.authors});
});

/*
Route           /update/publication/:id
Description     Update publication name using id
Access          PUBLIC
Parameters      id
Method          PUT

*/

shapeAI.put("/update/publication/:id", (req,res) =>
{
    database.publications.forEach((publication) =>
    {
        if(publication.id == req.params.id)
        publication.name = req.body.publicationName;
        return;
    });

    return res.json({publications: database.publications});
});

/*
Route           /update/book/publication/:isbn
Description     Update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT

*/

shapeAI.put("/update/book/publication/:isbn", (req,res) =>
{
    database.publications.forEach((publication) =>
    {
        if(publication.id === req.body.pubID) 
        return publication.books.push(req.params.isbn);  
    });

    database.books.forEach((book) =>
    {
        if(book.ISBN == req.params.isbn) {
        book.publication = req.body.pubID;
        return;
        }
    });
    return res.json({books: database.books, 
        publications: database.publications,
        message: "Successfully updated publication!!"
    });
});

/*
Route           /delete/book/:isbn
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE

*/

shapeAI.delete("/delete/book/:isbn", (req,res) => 
{
    const updatedBookDatabase =database.books.filter(
        (book) => book.ISBN !== req.params.isbn);

    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});

/*
Route           /delete/books/author/:isbn/authorid
Description     delete an author from book
Access          PUBLIC
Parameters      isbn, authorid
Method          DELETE

*/

shapeAI.delete("/delete/books/author/:isbn/:authorid", (req,res) => 
{
    database.books.forEach((book) =>
    {
        if(book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter(
                (author) => author !== parseInt(req.params.authorid));
            
            book.authors = newAuthorList;
            return;
        }
    });

    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorid)) {
            const newBooksList = author.books.filter(
                (book) => book !== req.params.isbn
            );

            author.books = newBooksList;
            return;
        }
    });

    return res.json({
        books: database.books, 
        authors: database.authors,
        message: "Author was deleted!!"});
});

/*
Route           /delete/books/publication/:isbn/:pubid
Description     delete a book from publication
Access          PUBLIC
Parameters      isbn, publicationid
Method          DELETE

*/

shapeAI.delete("/delete/books/publication/:isbn/:pubid", (req,res) => 
{
    database.publications.forEach((publication) =>
    {
        if(publication.id == req.params.pubid) {
            const newBooksList = publication.books.filter(
                (book) => book !== req.params.isbn);
            
            publication.books = newBooksList;
            return;
        }
    });

    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publication=0;
            return;
        }
    });

    return res.json({
        books: database.books, 
        publications: database.publications,
        message: "Publication was deleted!!"});
});

/*
Route           /delete/author/:id
Description     delete an author
Access          PUBLIC
Parameters      id
Method          DELETE

*/

shapeAI.delete("/delete/author/:id", (req,res) => 
{
    const updatedAuthorDatabase =database.authors.filter(
        (author) => author.id !== parseInt(req.params.id));

    database.authors = updatedAuthorDatabase;
    return res.json({authors: database.authors});
});

/*
Route           /delete/publication/:id
Description     delete an author
Access          PUBLIC
Parameters      id
Method          DELETE

*/

shapeAI.delete("/delete/publication/:id", (req,res) => 
{
    const updatedPublicationDatabase =database.publications.filter(
        (publication) => publication.id !== parseInt(req.params.id));

    database.publications = updatedPublicationDatabase;
    return res.json({publications: database.publications});
});

shapeAI.listen(3000, () => console.log("Server running!!"));