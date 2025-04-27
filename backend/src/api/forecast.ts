import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { ForecastCity, ForecastEntry, GroupedData, WeatherState, ErrorResponse } from '../types/types';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { city } = req.body as ForecastCity;

  try {
    const geoCodeResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.VITE_OPENWEATHER_API_KEY}`);
    const { data } = geoCodeResponse;

    if (!Array.isArray(data) || data.length === 0) {
      res.status(404).json({ message: "City not found" });
      return;
    }

    const { lat, lon } = data[0];

    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${process.env.VITE_OPENWEATHER_API_KEY}`);
    const forecastResponseData = forecastResponse.data.list;

    if (!forecastResponseData || forecastResponseData.length === 0) {
      res.status(500).json({ message: "Fetching the forecast data failed" });
      return;
    }

    const groupedData: GroupedData = {};
    forecastResponseData.forEach((entry: ForecastEntry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(entry);
    });

    const forecast = Object.entries(groupedData).map(([date, entries]: [string, ForecastEntry[]]) => {
      const temperatures = entries.map((entry) => entry.main.temp - 273.15);
      const minTemp = Math.round(Math.min(...temperatures));
      const maxTemp = Math.round(Math.max(...temperatures));
      const description = entries[4]?.weather[0]?.description || entries[0].weather[0].description;
      return { date, minTemp, maxTemp, description };
    });

    res.status(200).json({ forecast });

  } catch (error: any) {
    res.status(500).json({ message: error.message || "Unexpected error" });
  }
}
