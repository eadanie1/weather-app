import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../store/actions/weatherActions";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchWeather(city));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="d-flex justify-content-center">
        <input
          className="form-control"
          style={{ maxWidth: "300px", marginRight: "10px" }}
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn btn-dark">
          Get weather
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;
