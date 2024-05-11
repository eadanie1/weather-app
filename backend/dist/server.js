var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { tryCatch } from './global-logic/tryCatch.js';
const app = express();
app.use(express.json(), cors());
app.post('/forecast', tryCatch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.body;
    const geoCodeResponse = yield axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.VITE_OPENWEATHER_API_KEY}`);
    const { lat, lon } = geoCodeResponse.data[0];
    console.log(geoCodeResponse.data);
    // console.log(lat);
    // console.log(lon);
    const forecastResponse = yield axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${process.env.VITE_OPENWEATHER_API_KEY}`);
    const forecastResponseData = forecastResponse.data.list;
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
    res.json({ forecast });
})));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
