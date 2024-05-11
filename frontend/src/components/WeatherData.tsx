import axios from "axios";
import { useEffect, useState } from "react";

const WeatherData = () => {
  const [forecast, setForecast] = useState(null);
  const city = "Stockholm";
  // const countryCode = "se";
  // let location = `${city},${countryCode}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.post(`http://localhost:3000/forecast`, {
        city,
      });
      console.log(response.data.forecast);

      setForecast(response.data.forecast);
    };
    fetchWeatherData();
  }, []);

  return (
    <>
      <form>
        {forecast &&
          forecast.map((date) => <li key={date.date}>{date.date}</li>)}
      </form>
    </>
  );
};

export default WeatherData;
