import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/actions/weatherActions";

function WeatherDataRedux() {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather.data);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(weatherData);

  return (
    <ol>
      {/* {weatherData.map((weather) => (
        <li>{weather}</li>
      ))} */}
    </ol>
  );
}

export default WeatherDataRedux;
