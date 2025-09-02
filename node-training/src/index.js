// const math = require('./math');

// console.log(math.sum(1, 2));  //3

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

// document.querySelector("hi").innerText = "hello";
//Coz it’s in server side, and document is DOM API, so It’s only available in the browser.



const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 3000;

const todosRoute = require("./routes/todoRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const internalRoute = require("./routes/internal");
const authenticate = require("./middlewares/authenticate");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Public routes
app.use("/auth", authRoute);
app.use("/users", userRoute);

app.use(authenticate);

// Private routes
app.use("/todos", todosRoute);
app.use("/internal", internalRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

