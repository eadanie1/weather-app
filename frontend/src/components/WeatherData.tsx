import axios from "axios";
import { useEffect, useState } from "react";

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
      <table
        style={{ borderCollapse: "separate", borderSpacing: "150px 40px" }}
      >
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
                <tr key={`${date.date}-${index}`}>
                  <td
                    key={`${date.date}-${index}-date`}
                    style={{ textAlign: "left" }}
                  >
                    {formattedDate}
                  </td>
                  <td key={`${date.date}-${index}-minTemp`}>
                    {date.minTemp} / {date.maxTemp}&deg;C
                  </td>
                  <td
                    key={`${date.date}-${index}-description`}
                    style={{ textAlign: "right" }}
                  >
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
