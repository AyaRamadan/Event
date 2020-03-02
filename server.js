//Requires
let express = require("express");
const server = express();
server.locals.moment = require("moment");
let authenticationRouter = require("./Routers/authRouter");
let speakerRouter = require("./Routers/speakerRouter");
let eventRouter = require("./Routers/eventRouter");
let adminRouter = require("./Routers/adminRouter");
let path = require("path");
let mongoose = require("mongoose");
let session = require("express-session");
//openning server
server.listen(8083, () => {
    console.log("I am Listenning at 8083............ ")
});


//DB connection 
mongoose.connect("mongodb://localhost:27017/eventDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
        console.log("DB connected successfully");
    })
    .catch((error) => {
        console.log(error + " ");
    });


// Starting MiddleWare
server.use(function (request, response, next) {
    console.log("First Middle ware " + request.method + " : " + request.url);
    next();
});

//Authentication
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "/views"));
server.use(express.static(path.join(__dirname, "public")))
server.use(express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));


server.use(session({ secret: 'aya', saveUninitialized: true, resave: true }));

server.use(authenticationRouter);

server.use((request, response, next) => {
    if (request.session.role)
        next();
    else
        response.redirect("/login");
});
server.use((request, response, next) => {
    response.locals.adminName = request.session.name;
    next();

});

//home page
server.get("/home", function (request, response) {
    response.send("Welcome To Home");
});


//Speakers
server.use("/speaker", speakerRouter);

//Event
server.use("/event", eventRouter);

//Admin
server.use("/admin", adminRouter);

//Last MiddleWare
server.use(function (request, response) {
    response.send("Last MiddleWare");
});