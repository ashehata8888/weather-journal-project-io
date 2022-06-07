// ****According to the ///project rubric\\\.
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
const path = require('path');

/* I put my server file in backend folder to make the project more organized 
   so I used path package to able to make the server reach the right directory
   to connect the server side code to the client side code */

// reference "https://nodejs.org/api/path.html#pathjoinpaths"
app.use(express.static(path.join(__dirname, '..', 'website')));

// Callback function for POST route
// references 
// https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/d1095620-35a3-425f-860d-44267f3ae2c6"
// https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/f0b46126-a01c-43c9-8431-9e9e6ae4d85d
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
function postDataFun (req, res){
  let data=req.body;
  // the end point will receive all data was passed by req.body so it will be saved in the projectData
  projectData=data;
  res.static(200).send(projectData);

  console.log(projectData);
}

// another way to assign values to the projectData endpoint 
  // let newDate = data.newDate;
  // let temp=data.temp;
  // let city=data.city;
  // let feelings=data.feelings;
  //  projectData={newDate,temp,city,feelings};


// Post Route
// reference:
//  https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/d1095620-35a3-425f-860d-44267f3ae2c6

app.post("/add", postDataFun);

// GET Route
// reference "https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/c06e119b-710e-40f9-838e-123a36b650fc"
app.get('/all', function (req, res) {
  res.send(projectData);
});

// // Setup Server
// port below 1024 can't choosen due to they already reserved 
// reference "https://developer.mozilla.org/en-US/docs/Glossary/Port"
const port = 7000;

// reference ("https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/3bb6ade1-5c06-4690-8ade-33e070f61b67")
app.listen(port, listening);
// another way to write this function function 
// app.listen(port,()=>{console.log(`running on localhost: ${port}`)})

//call back function to execute
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
