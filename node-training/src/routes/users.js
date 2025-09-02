const express = require("express");
const router = express.Router();

router.use(logger)

router.get("/", (req, res) => {
  console.log(req.query.name)
  res.send("User List");
});

router.get("/new", (req, res) => {
  // res.render("users/new", {firstName:'test'});
  res.render("users/new");
});

router.post("/", (req, res) => {
  const isValid = false
  if (isValid) {
    users.push({firstName:req.body.firstName})
    res.redirect(`/users/${users.length - 1}`)
  } else {
    console.log('Error')
    res.render('users/new', {firstName: req.body.firstName})
  }
  res.send('Hi')
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user)
    res.send(`Get User With ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`);
  });

// router.get("/:id", (req, res) => {
//   res.send(`Get User With ID ${req.params.id}`);
// });

// router.put("/:id", (req, res) => {
//   res.send(`Update User With ID ${req.params.id}`);
// });

// router.delete("/:id", (req, res) => {
//   res.send(`Delete User With ID ${req.params.id}`);
// });

const users = [{ name: "Kyle" }, { name: "Sally" }];

router.param("id", (req, res, next, id) => {  //param is a type of middleware(between requests and responses)
  req.user = users[id]  //can name other name for user
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
} //middleware for logging out sth


module.exports = router;

//middleware: the code that runs between the starting of the requests and the ending of the requests
