import React from "react";
import Headers from "./components/Headers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SoilObservationPage from "./components/Page/SoilObservationPage";
import PlantObservationPage from "./components/Page/PlantObservationPage";
import AgricultureObservationPage from "./components/Page/AgricultureObservationPage";
import WateringObservationPage from "./components/Page/WateringObservationPage";
import WeatherObservationPage from "./components/Page/WeatherObservationPage";
function App() {
  return (
    <Router>
      <Headers />
      <Routes>
        <Route path="/toprak-gozlemi" element={<SoilObservationPage />} />
        <Route path="/bitki-gozlemi" element={<PlantObservationPage />} />
        <Route
          path="/savasim-gozlemi"
          element={<AgricultureObservationPage />}
        />
        <Route path="/sulama-gozlemi" element={<WateringObservationPage />} />
        <Route path="/hava-gozlemi" element={<WeatherObservationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
