import './App.css';
import Weather
 from './Weather';
export default function App() {
  return (
    <div className="App">
      <div className="container">
    <h1>Weather Search App</h1>
    <Weather defaultCity = "New york" />
    <footer>This project was coded by Gabriela Hyodo and is open-sourced at{" "}<a href="https://github.com/hyodogabriela/search-weather-project">GitHub</a></footer>
    </div>
    </div>
  );
}

