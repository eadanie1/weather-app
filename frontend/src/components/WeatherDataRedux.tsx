import { useSelector } from "react-redux";
import styles from "../styles/bootstrapStyles.module.css";

const WeatherDataRedux = () => {
  const { forecast, loading, error, selectedCity } = useSelector(
    (state) => state.weather
  );

  return (
    <>
      {selectedCity === "Enter a city to show the forecast" ? (
        <h2>{selectedCity}</h2>
      ) : (
        <h2>Weather Forecast for {selectedCity}</h2>
      )}
      <table
        className={styles.body}
        style={{ borderCollapse: "separate", borderSpacing: "150px 40px" }}
      >
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
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

export default WeatherDataRedux;
