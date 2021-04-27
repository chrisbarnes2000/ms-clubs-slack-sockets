//App.js
const express = require("express");
const app = express();
//Socket.io has to use the http server
const server = require("http").Server(app);

//Socket.io
const io = require('socket.io')(server);
io.on("connection", (socket) => {
  console.log("🔌 New user connected! 🔌");
})

//Express View Engine for Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
//Establish your public folder
app.use('/public', express.static('public'))


app.get("/", (req, res) => {
  res.render("index.handlebars");
});

server.listen("3000", () => {
  console.log("Server listening on Port 3000");
});
