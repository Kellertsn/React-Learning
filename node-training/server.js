const express = require("express");
const app = express();

app.use(express.static("public"))
app.use(express.urlencoded({extended: true})) //allows us to access information of form
app.use(express.json())

// app.use(logger) //always define your middleware at the top of the page
app.set("view engine", "ejs");


// Define a GET route for the root URL ('/')
// app.get("/", logger, (req, res) => {
//   // res.download('server.js')
//   // res.status(500).json({message: "Error"})
//   res.render("index", { text: "world" });
// });

const userRouter = require('./routes/users')
// const postRouter = require('./routes/posts')


app.use('/users', userRouter)
// app.use('/posts', postRouter)

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
} //middleware for logging out sth

// Start the server and listen on port 3000
app.listen(3000);

