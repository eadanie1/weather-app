import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { tryCatch } from './global-logic/tryCatch.js'
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json(), cors());

const city = 'Durban';
const countryCode = 'uk';
let location = `${city},${countryCode}`;

app.get(
  '/forecast',
  tryCatch(async (req: Request, res: Response) => {
    const geoCodeResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.VITE_OPENWEATHER_API_KEY}`);
    const { lat, lon } = geoCodeResponse.data[0];

    // console.log(geoCodeResponse.data);
    // console.log(lat);
    // console.log(lon);
    
    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${process.env.VITE_OPENWEATHER_API_KEY}`);
    const forecastResponseData = forecastResponse.data.list;

    // const day1 = forecastResponseData.filter(date => date.dt_txt.split(" ")[0] === forecastResponseData[0].dt_txt.split(" ")[0]);

    // const day2 = forecastResponseData.filter(date => date.dt_txt.split(" ")[0] === forecastResponseData[0].dt_txt.split(" ")[0]);
    
    // console.log(day1);
    // console.log(forecastResponseData);

    // Group forecast data by date
    const groupedData = {};
    forecastResponseData.forEach(entry => {
      const date = entry.dt_txt.split(" ")[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(entry);
    });

    // Convert grouped data to array of objects with high, low, and description
    const forecast = Object.entries(groupedData).map(([date, entries]) => {
      const temperatures = entries.map(entry => entry.main.temp);
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);
      const description = entries[0].weather[0].description;
      return { date, minTemp, maxTemp, description };
    });
    
    res.json({ forecast })
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});