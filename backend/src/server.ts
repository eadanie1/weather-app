import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { tryCatch } from './global-logic/tryCatch.js'
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, ForecastCity, ForecastEntry, GroupedData, WeatherState } from './types/types.js';

const app = express();
app.use(express.json(), cors());

app.post(
  '/forecast',
  tryCatch(async (req: Request<{}, {}, ForecastCity>, res: Response<WeatherState | ErrorResponse | void>): Promise<void> => {
    const { city } = req.body;
    
    const geoCodeResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.VITE_OPENWEATHER_API_KEY}`);

    const { data } = geoCodeResponse;
    if (!Array.isArray(data) || data.length === 0) {
      // return res.status(404).json("City not found");
      res.status(404).json({message: "City not found"});
      return;
    }

    const { lat, lon } = data[0];
    
    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${process.env.VITE_OPENWEATHER_API_KEY}`);
    const forecastResponseData = forecastResponse.data.list;  
    
    if (!forecastResponseData || forecastResponseData.length === 0) {
      res.status(500).json({ message: "Fetching the forecast data failed" });
      return;
    }

    // Group forecast data by date
    const groupedData: GroupedData = {};
    forecastResponseData.forEach((entry: ForecastEntry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(entry);
    });

    // Convert grouped data to array of objects with high, low, and description
    const forecast = Object.entries(groupedData).map(([date, entries]) => {
      const temperatures = entries.map(entry => entry.main.temp - 273.15);
      const minTemp = Math.round(Math.min(...temperatures));
      const maxTemp = Math.round(Math.max(...temperatures));
      const description = entries[4]?.weather[0]?.description || entries[0].weather[0].description;
      return { date, minTemp, maxTemp, description };
    });
    
    res.json({ forecast });
    return;
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});