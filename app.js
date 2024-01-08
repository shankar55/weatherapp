//jshint esversion:6
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res) {
  const query=req.body.CityName;
  const apiKey="aae82eb15d6657a7793591f2c7e329df";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=aae82eb15d6657a7793591f2c7e329df&units=metric";
  https.get(url,function(response){
    console.log(response);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The weather is currently "+weatherDescription+" </h1>")
      res.write("<h1>The temperature in "+query+" is "+temp+"degree Celsius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  })
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
