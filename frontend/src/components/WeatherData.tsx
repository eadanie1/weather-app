import axios from "axios";
import { useEffect, useState } from "react";

const WeatherData = () => {
  const [forecast, setForecast] = useState(null);
  const city = "Stockholm";
  const countryCode = "se";
  let location = `${city},${countryCode}`;

  console.log(forecast);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.get(`http://localhost:3000/forecast`);

      setForecast(response);
    };
  }, []);

  return <>{forecast}</>;
};

export default WeatherData;
