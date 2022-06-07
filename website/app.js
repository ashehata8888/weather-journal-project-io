/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = ",&appid=5fdf2a679529e53e1220bc9ee017b9fa&units=imperial";

// baseURL variable of the API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Error Element 
const error = document.querySelector("#error");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Button Function
const ButtonFun = () => { 
  // Vales of zipCode and feeling elements
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;

  // getWeatherData return promise
  fetchWeatherData(zipCode).then((data) => {
    //making sure from the received data to execute rest of the steps
    if (data) {
      const {
        main: {temp},
        name: city
      } = data;

      const info = {
        newDate,
        city,
        temp: Math.round(temp), 
        feelings
      };

      postData("/add", info).then(setTimeout(retrieveData,0));
   
    }
  });
}

// Adding EventListener on the Generate Button
document.getElementById("generate").addEventListener("click", ButtonFun);

// API Fetching 
const fetchWeatherData = async (z) => {
  try {
    const res = await fetch(baseURL + z + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      // display the error message on UI
      error.innerHTML = data.message;
      setTimeout(()=> error.innerHTML = '', 3000)
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

//POST function
// using "async" keyword before the function's parameters. to provide the promise for fetching the data needed
// reference https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/6931a2aa-e847-4973-bb74-bb70e71b36a0

const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), 
});

  try {
    const newData = await response.json();
           return newData
  }catch(error) {
  console.log("error", error);
  }
}


// updateData Function

let count =0;
const retrieveData = async () => {
 const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById("date").innerHTML = '<span>Date : </span>' + allData.newDate;
    document.getElementById("temp").innerHTML = '<span>Temperature : </span>' + allData.temp + ' degrees ';
    document.getElementById("city").innerHTML = '<span>City : </span>' + allData.city;
    document.querySelector("#content").innerHTML='<div id="contentTitle" style="font-weight:bold; padding-bottom:5px;">Content</div>' + allData.feelings;
   
    count+=1
    console.log(`Number of clicks ${count}`);
  } catch (error) {
    console.log(error);
  }
}