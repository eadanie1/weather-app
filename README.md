# Weather Forecast App

This project is a weather forecast application that fetches weather data from the OpenWeatherMap API. It allows users to search for a city and displays its weather forecast.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Styling**: Bootstrap
- **State Management**: Redux
- **API**: OpenWeatherMap API

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/eadanie1/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Install backend and frontend dependencies:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory and add your OpenWeatherMap API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key
   ```

5. Start the backend server:

   ```bash
   # In the backend directory
   npm run devstart
   ```

6. Ser is now listening to incoming requests on `http://localhost:3000`.

## Backend

The backend server is built using Express.js. It exposes a single endpoint `/forecast` that accepts a POST request with the city name in the request body. It then fetches weather data from the OpenWeatherMap API and returns the forecast data.

### Dependencies

- axios
- cors
- dotenv
- express

### Running the Backend

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

## Frontend

The frontend is a React application that communicates with the backend to fetch and display weather data. It includes a form for users to input a city name and a component to display the weather forecast.

### Components

- **WeatherDataRedux**: Displays the weather forecast received from the backend. It includes a loading spinner and error handling.
- **WeatherForm**: Form component for users to input a city name and fetch weather data.

### Dependencies

- axios
- react-redux
- react-spinners

### Running the Frontend

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the app.

## Redux State Management

Redux is used for state management in the application. The state includes weather forecast data, loading status, errors, and the selected city.

### Actions

- **FETCH_WEATHER_REQUEST**: Triggered when weather data is being fetched.
- **FETCH_WEATHER_SUCCESS**: Triggered when weather data is successfully fetched.
- **FETCH_WEATHER_FAILURE**: Triggered when there is an error fetching weather data.
- **SET_SELECTED_CITY**: Triggered when a city is selected by the user.

### Reducers

The weather reducer handles actions related to weather data, loading status, errors, and selected city.

## License

This project is licensed under the [MIT License](LICENSE).
