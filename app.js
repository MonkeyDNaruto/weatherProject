const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const appKey = "69ae4a71294c3be197bb1c18ef38509c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + appKey +"&units=" + unit;
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather condition in " + query + " is " + weatherDescription + "</p>")
            res.write("<h1>The current temperature of " + query + " is " + temp + " degree celcius</h1>");
            res.write("<img src="+ imageUrl +">")
            res.send();
        })
    })
})

app.listen(3000, (req, res) => {
    console.log("Server is running in port 3000");
})