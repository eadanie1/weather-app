import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../store/actions/weatherActions";
import { Dispatch } from "redux";

const WeatherForm = () => {
  const [city, setCity] = useState<string>("");
  const dispatch: Dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchWeather(city));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="d-flex justify-content-center">
        <input
          id="city-form"
          className="form-control"
          style={{ maxWidth: "300px", marginRight: "10px" }}
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          pattern=".{3,}"
          title="Please enter at least 3 characters"
          required
        />
        <button type="submit" className="btn btn-dark">
          Get weather
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;
