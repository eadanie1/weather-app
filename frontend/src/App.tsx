import "./App.css";
// import "./styles/main.css";
import styles from "./styles/bootstrapStyles.module.css";
import WeatherDataRedux from "./components/WeatherDataRedux";
import WeatherForm from "./components/WeatherForm";

function App() {
  return (
    <>
      <WeatherDataRedux />
      <WeatherForm />
    </>
  );
}

export default App;
