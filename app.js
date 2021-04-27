//App.js
const express = require("express");
const app = express();
//Socket.io has to use the http server
const server = require("http").Server(app);

//Socket.io
const io = require("socket.io")(server);
//We'll store our online users here
let onlineUsers = {};
//Save the channels in this object.
let channels = {"General" : []};

io.on("connection", (socket) => {
  // Make sure to send the users to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
})

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// //Loads the handlebars module
// const handlebars = require("express-handlebars");
// //Sets our app to use the handlebars engine
// app.set("view engine", "hbs");
// //Sets handlebars configurations (we will go through them later on)
// app.engine("hbs", handlebars());

//Establish your public folder
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("layouts/main.handlebars");
});

server.listen("3000", () => {
  console.log("Server listening on Port 3000");
});
