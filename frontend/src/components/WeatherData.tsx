import axios from "axios";
import { useEffect, useState } from "react";
import MyGridComponent from "./GridComponent";

const WeatherData = () => {
  const [forecast, setForecast] = useState(null);
  const city = "Stockholm";

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
      <table>
        <tbody>
          {forecast &&
            forecast.map((date, index) => {
              // Parse the date string
              const parsedDate = new Date(date.date);
              // Format the date as "Sun, May 12"
              const formattedDate = parsedDate.toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });

              return (
                <tr
                  key={`${date.date}-${index}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    minWidth: "500px",
                  }}
                >
                  <td key={`${date.date}-${index}-date`}>{formattedDate}</td>
                  <td key={`${date.date}-${index}-minTemp`}>
                    {date.minTemp}/{date.maxTemp}&deg;C
                  </td>
                  <td key={`${date.date}-${index}-description`}>
                    {date.description}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default WeatherData;
