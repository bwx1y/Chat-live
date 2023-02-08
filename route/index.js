const express = require("express");
const route = express.Router();

let server = {};
let user = {};

// route for express
route.get("/", (req, res) => {
  if (!req.query.id) {
    res.render("noLogin", { title: "Chat-live", navTitle: "Chat live", ButtonNav: "Login" });
  } else if (!user[req.query.id]) {
    res.redirect("/login");
  } else {
    let data = user[req.query.id];
    res.render("index", { title: `Helo ${data.username}`, navTitle: `Username : ${data.username}`, ButtonNav: "LogOut" });
  }
});

// for login
route
  .route("/login")
  .get((req, res) => {
    res.render("login", { title: "Chat-live | Login", navTitle: "Chat live", ButtonNav: "Login" });
  })
  .post((req, res, next) => {
    user[req.body.data.id] = { id: req.body.data.id, username: req.body.data.username };
    next();
  });

// server socket.io
const Io = (socket) => {
  socket.emit("id", socket.id);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", { form: user[data.id], message: data.message });
  });
};

// add to let server
server.io = Io;
server.index = route;

// export
module.exports = server;
