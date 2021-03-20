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
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "cookie-clan",
// });
const con = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6400322",
  password: "MapNmn5DTx",
  database: "sql6400322",
});
// const query = util.promisify(con.query).bind(con);

app.get("/", (req, res) => {
  res.render("index", { page: "home" });
});
app.get("/explore", (req, res) => {
  let query = `SELECT * FROM schools`;
  con.query(query, (err, result) => {
    console.log(result);
    res.render("explore", { page: "explore", schools: result });
  });
});

app.get("/view/:school", (req, res) => {
  let school_id = req.params.school;
  // let school_id = "d3lvGM0lK";
  // school_id = req.params["id"];
  let getSchoolDetails = `SELECT * FROM schools WHERE schoolID ='${school_id}'`;
  con.query(getSchoolDetails, (err, results) => {
    if (err) throw err;
    // let { schoolID, name, imgurl, city, state, distance, rating } = results[0];
    let schoolName = results[0].name,
      imgurl = results[0].imgurl,
      city = results[0].city,
      state = results[0].state,
      distance = results[0].distance,
      fee = results[0].fee,
      rating = results[0].rating;
    // console.log(name, imgurl, city, state, distance, rating);
    console.log(results[0]);
    let getDetails = `SELECT * FROM details WHERE schoolID ='${school_id}'`;
    con.query(getDetails, (err, result) => {
      if (err) throw err;

      let about = result[0].about,
        achievements = result[0].achievements,
        faculties = result[0].faculties,
        activities = result[0].activities,
        vacancy = result[0].vacancy,
        number = result[0].contactNum,
        email = result[0].contactMail;
      let ach = [],
        x = achievements.split(",");
      x.forEach(function (e) {
        if (ach.indexOf(e) == -1) ach.push(e);
      });
      let fac = [],
        y = faculties.split(",");
      y.forEach(function (e) {
        if (fac.indexOf(e) == -1) fac.push(e);
      });

      let act = [],
        z = activities.split(",");
      z.forEach(function (e) {
        if (act.indexOf(e) == -1) act.push(e);
      });
      res.render("view", {
        page: "view",
        school: schoolName,
        img: imgurl,
        city: city,
        state: state,
        about: about,
        number: number,
        email: email,
        vacancy: vacancy,
        achievements: ach,
        faculties: fac,
        activities: act,
        fee: fee,
      });
    });
  });
});
app.get("/search", (req, res) => {
  res.render("search", { page: "search" });
});
app.post("/search", (req, res) => {
  let query = req.body.school;
  let range = req.body.fee;
  let getSchools = `SELECT * FROM schools WHERE '${query}' IN(city,name,state) AND fee<='${range}'`;
  // let getSchools = `SELECT * FROM schools WHERE city='${query}' OR name='${query}' OR state='${query}'`;
  con.query(getSchools, (err, results) => {
    console.log(results[0]);
    res.render("explore", { page: "explore", schools: results, msg: query });
  });
});
app.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});
app.get("/chatbot", (req, res) => {
  res.render("chatbot", { page: "chatbot" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
