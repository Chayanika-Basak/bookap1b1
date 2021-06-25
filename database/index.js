const books = [
    {
        ISBN: "12345ONE",
        title: "Getting started with MERN",
        authors: [1,2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        Category: ["fiction","programming","tech","web dev"],
    },

    {
        ISBN: "12345TWO",
        title: "Getting started with Python",
        authors: [1,2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        Category: ["fiction","programming","tech","web dev"],
    }
];

const authors = [
    {
        id: 1,
        name: "Pavan",
        books: ["12345ONE"],
    },

    {
        id: 2,
        name: "Deepak",
        books: ["12345ONE"]
    }
];

const publications = [
    {
        id: 1,
        name: "Chakra",
        books: ["12345ONE"],
    }
];

module.exports = {books , authors , publications};