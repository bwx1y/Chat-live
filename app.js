const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const server = require("./route/index");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.urlencoded());

// set view
app.set("views", "./views");
app.set("view engine", "pug");

// set favicon
app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));

// static file
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "./node_modules/jquery/dist")));

// route
app.use(server.index);

io.on("connection", server.io);

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
