const express = require("express");
const https = require("https");
const app = express();

app.get("/", (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=69ae4a71294c3be197bb1c18ef38509c&units=metric";
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather condition in Kathmandu is " + weatherDescription + "</p>")
            res.write("<h1>The current temperature of Kathmandu is " + temp + " degree celcius</h1>");
            res.write("<img src="+ imageUrl +">")
            res.send();
        })
    })


})

app.listen(3000, (req, res) => {
    console.log("Server is running in port 3000");
})