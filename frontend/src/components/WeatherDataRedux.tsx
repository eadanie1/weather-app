import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import styles from "../styles/bootstrapStyles.module.css";
import { Weather, WeatherState } from "../types/types";

const WeatherDataRedux = () => {
  const { forecast, loading, error, selectedCity } = useSelector(
    (state: WeatherState) => state.weather
  );

  const formatCity = (city: string): string => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  return (
    <div className={styles.weatherBackground}>
      <div style={{ minHeight: "50px" }}>
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50px" }}
          >
            <BeatLoader
              color={"rgb(248, 153, 99)"}
              loading={loading}
              size={15}
            />
          </div>
        )}
      </div>
      {error && <p className={`${styles.frame} text-danger`}>Error: {error}</p>}
      {selectedCity === "Enter a city to show the forecast" ? (
        <h2>{selectedCity}</h2>
      ) : (
        <h2 style={{ maxWidth: "500px" }}>
          Weather forecast for {formatCity(selectedCity)}
        </h2>
      )}
      <table className={styles.frame}>
        <tbody>
          {forecast &&
            forecast.map((date: Weather, index: number) => {
              const parsedDate = new Date(date.date);
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
    </div>
  );
};

export default WeatherDataRedux;
