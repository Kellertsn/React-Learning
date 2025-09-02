// this repo is responsible for retrieving the todo from the database

const shortid = require("shortid");


// In-memory store (swap for DB later)
let todos = [
    {
        id: shortid.generate(),
        title: "Learn Node.js",
        description: "Understand the basics of Node.js",
        completed: false,
    },
];

module.exports = todos;