const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");

//Database connection string
if (process.env.NODE_ENV == "production") {
    const dotenv = require("dotenv").config();
} 
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-5itrs.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

//Creating the server object
const app = express();

//Set template enginge for server 
app.set("view engine", "ejs");

//Import route middlewares
const tasksRoute = require("./routes/tasksRoute");
const errorRoute = require("./routes/404Route");
const taskFormRoute = require("./routes/taskFormRoute");
const userHistoryRoute = require("./routes/userHistoryRoute");
const authRoute = require("./routes/authRoute");

//Middleware Pipeline begins
//----
//Middleware to serve static files 
app.use(express.static("./public"));

//body parser
app.use(bodyParser.urlencoded({extended: false}));

//securing http header
app.use(helmet());

//using compression
app.use(compression());

//sessions
const store = new MongoDBStore({
    uri: uri,
    collection: "sessions"
});
app.use(session( {
    secret: "some string",
    resave: false,
    saveUninitialized: false,
    store: store
} ));
app.use(flash());

//various routes
app.use(tasksRoute);
app.use(taskFormRoute);
app.use(userHistoryRoute);
app.use(authRoute);

app.use(errorRoute);

//----
//Pipeline ends

//Connecting the server to mongoDb
//Adding listen event 
mongoose.connect(uri, { useNewUrlParser: true })
    .then(result => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(err));
