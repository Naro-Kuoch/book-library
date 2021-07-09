const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const userRouter = require('./routers/user-router');
const bookRouter = require('./routers/book-router');
const port = 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(userRouter);
app.use(bookRouter);
mongoose.connect('mongodb+srv://user1:User12345@cluster0.6k8oa.mongodb.net/library?retryWrites=true&w=majority',{ useNewUrlParser: true })
.then(result => {
  console.log("Db is connected");
  app.listen(port);
}).catch(err => {
  console.log(err);
})
