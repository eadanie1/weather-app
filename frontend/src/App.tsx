import "./App.css";
import "./styles/main.css";
import WeatherDataRedux from "./components/WeatherDataRedux";
import WeatherData from "./components/WeatherData";
import LocationForm from "./components/LocationForm";
import WeatherForm from "./components/WeatherForm";

function App() {
  return (
    <>
      {/* <WeatherData /> */}
      <WeatherDataRedux />
      <WeatherForm />
      {/* <LocationForm /> */}
    </>
  );
}

export default App;
