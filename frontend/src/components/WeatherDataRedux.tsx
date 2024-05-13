// import { useDispatch, useSelector } from "react-redux";
// import { fetchWeather } from "../store/actions/weatherActions";

// function WeatherDataRedux() {
//   const dispatch = useDispatch();
//   const weatherData = useSelector((state) => state.weather.data);
//   const loading = useSelector((state) => state.weather.loading);
//   const error = useSelector((state) => state.weather.error);

//   useEffect(() => {
//     dispatch(fetchWeather());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   console.log(weatherData);

//   return (
//     <ol>
//       {/* {weatherData.map((weather) => (
//         <li>{weather}</li>
//       ))} */}
//     </ol>
//   );
// }

// export default WeatherDataRedux;

// WeatherData.js

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchWeather } from "../store/actions/weatherActions";

// const WeatherDataRedux = () => {
//   const dispatch = useDispatch();
//   const { forecast, loading, error } = useSelector((state) => state.weather);
//   const city = "Stockholm"; // You can change this to any city you want

//   useEffect(() => {
//     dispatch(fetchWeather(city));
//   }, [dispatch, city]);

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {forecast && (
//         <table>
//           <tbody>
//             {forecast.map((date, index) => (
//               <tr key={`${date.date}-${index}`}>
//                 <td>{date.date}</td>
//                 <td>
//                   {date.minTemp} / {date.maxTemp}&deg;C
//                 </td>
//                 <td>{date.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default WeatherDataRedux;

import { useSelector } from "react-redux";

const WeatherDataRedux = () => {
  const { forecast, loading, error } = useSelector((state) => state.weather);

  return (
    <table style={{ borderCollapse: "separate", borderSpacing: "150px 40px" }}>
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
  );
};

export default WeatherDataRedux;
