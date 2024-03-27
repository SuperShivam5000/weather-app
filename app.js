const https = require("https");
const express = require("express");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res)
{
  var location = req.body.cityName;
  https.get("https://api.weatherapi.com/v1/current.json?key=a087457c261741ba98d170744222108&q=" + location, function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      var temp = weatherData.current.temp_c;
      var icon = "https:" + weatherData.current.condition.icon;
      var description = weatherData.current.condition.text;
      res.write('<head><meta charset="utf-8"></head>');
      res.write("<h3>Temprature is "+ temp + " Degree Celcius</h3>");
      res.write("<p>The Weather Is " + description + "</p>")
      res.write('<img src="' + icon + '">');
      res.send();
    })
  });
});


app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
