const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();


const app = express();

app.get("/:city", async(req , res)=>{
    try{
        const page = await axios.get(process.env.SCRAPE_API_FIRST+req.params.city+process.env.SCRAPE_API_LAST);
        const $ = cheerio.load(page.data);
        const date = $(process.env.DATE_CLASS).text();
        const temprature = $(process.env.TEMPRATURE_CLASS).text();
        const minMaxTemp  = $(process.env.MIN_MAX_TEMPRATURE).text();
        const humidityPressure  = $(process.env.HUMIDITY_PRESSURE).text();
        let minTemp = '';
        let maxTemp = '';
        let humidity = '';
        let pressure = '';
       for(let i=0; i<6;i++){
        if(i<3){
            minTemp = minTemp + minMaxTemp[i];
        }else{
            maxTemp = maxTemp + minMaxTemp[i];
        }
       }
       for(let i=0; i<6; i++){
        if(i<2){
         humidity = humidity +humidityPressure[i];
        }else{
            pressure = pressure + humidityPressure[i];
        }
       }
      
      const weatherData = {
        date ,
        temprature,
        minTemp,
        maxTemp,
        humidity, 
        pressure,
      } 
    
      res.send(weatherData);
    }catch(err){
        console.log(err);
    }
  
});

app.listen(process.env.PORT , ()=>{
    console.log("server started at port 3000");
});