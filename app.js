const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const multer = require("multer");
const shortid = require("shortid");
const util = require("util");
const app = express();
app.use(
  session({
    secret: "mnbvcxz",
    resave: true,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cookie-clan",
});
const query = util.promisify(con.query).bind(con);

app.get("/", (req, res) => {
  res.render("index", { page: "index" });
});
app.get("/explore", (req, res) => {
  let query = `SELECT * FROM schools`;
  con.query(query, (err, result) => {
    console.log(result);
    res.render("explore", { page: "explore", schools: result });
  });
});
let globArr = [];
let arr = "img.jpg,img2.jpf,imr.jpg";
let answ = arr.split(",");
answ.forEach(function (obj) {
  globArr.push(obj);
});
console.log(globArr);
app.get("/view/:id", (req, res) => {
  let schoolID = req.params.id;
  let query = `SELECT * FROM schools WHERE schoolID ='${schoolID}'`;
  con.query(query, (err, results) => {
    if (err) throw err;
    let getDetails = `SELECT * FROM details WHERE schoolID ='${schoolID}'`;
    con.query(getDetails, (err, result) => {
      console.log(result);
      res.render("view", {
        page: "view",
        name: results[0].name,
        city: results[0].city,
        state: results[0].state,
        img: results[0].imgurl,
        about: result[0].about,
        achievements: result[0].achievements,
        faculties: result[0].faculties,
        activities: result[0].activities,
        vacancy: result[0].vacancy,
        number: result[0].contactNum,
        email: result[0].contactMail,
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
