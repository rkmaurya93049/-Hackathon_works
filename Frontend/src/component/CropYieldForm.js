import React, { useState } from "react";
import "./CropYieldForm.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import OutputPage from "./OutputPage";

const CropYieldForm = () => {
  const [formData, setFormData] = useState({
    Soil_Type: "",
    Crop: "",
    Rainfall_mm: "",
    Temperature_Celsius: "",
    Fertilizer_Used: false,
    Irrigation_Used: false,
    Weather_Condition: "",
    Days_to_Harvest: "",
    location: "",
  });

  const [weather, setWeather] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const apiKey = "00bd7c52e0f29642407adab25cb70894";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (res.status !== 200) {
        alert("Error: " + data.message);
        return;
      }

      const weatherId = data.weather[0].id;
      let mappedCondition = "Sunny";

      if (weatherId >= 200 && weatherId < 600) {
        mappedCondition = "Rainy";
      } else if (weatherId >= 600 && weatherId < 800) {
        mappedCondition = "Cloudy";
      } else if (weatherId >= 700 && weatherId < 800) {
        mappedCondition = "Cloudy";
      } else if (weatherId === 800) {
        mappedCondition = "Sunny";
      } else if (weatherId > 800) {
        mappedCondition = "Cloudy";
      }

      setWeather(data);
      setFormData((prev) => ({
        ...prev,
        location: data.name || prev.location,
        Temperature_Celsius: data.main.temp,
        Weather_Condition: mappedCondition,
      }));
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Rainfall_mm < 100) {
      alert("Rainfall is too low.");
      return;
    } else if (formData.Rainfall_mm > 1000) {
      alert("Rainfall is too high");
      return;
    }

    if (formData.Temperature_Celsius < -10) {
      alert("Temperature is too cold.");
      return;
    } else if (formData.Temperature_Celsius > 60) {
      alert("Temperature is too hot.");
      return;
    }

    if (formData.Days_to_Harvest < 60) {
      alert("Harvest time is too early.");
      return;
    } else if (formData.Days_to_Harvest > 150) {
      alert("Harvest time is too late.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + (err.detail || res.statusText));
        return;
      }
      const data = await res.json();
      setPrediction(data.predicted_yield);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      alert("Failed to connect to backend");
    }
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Unable to fetch location");
      }
    );
  };

  const handlePredictAgain = () => {
    setPrediction(null);
  };

  if (prediction) {
    return (
      <OutputPage
        result={prediction}
        response={{
          soil: formData.Soil_Type,
          crop: formData.Crop,
          temp: formData.Temperature_Celsius,
          weather: formData.Weather_Condition,
          rainfall: formData.Rainfall_mm,
          irrigation: formData.Irrigation_Used ? "Yes" : "No",
          fertilizer: formData.Fertilizer_Used ? "Yes" : "No",
        }}
        chartUrl="/chart-placeholder.png"
        onPredictAgain={handlePredictAgain}
      />
    );
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-card">
        <h2 className="form-title">🌾 Predict Your Yield</h2>
        <div className="form-row">
          <label>Soil Type</label>
          <select
            name="Soil_Type"
            value={formData.Soil_Type}
            onChange={handleChange}
            required
          >
            <option value="">Not Selected</option>
            <option value="Sandy">Sandy</option>
            <option value="Loamy">Loamy</option>
            <option value="Clay">Clay</option>
            <option value="Black">Black Soil</option>
          </select>
        </div>

        <div className="form-row">
          <label>Crop Type</label>
          <select
            name="Crop"
            value={formData.Crop}
            onChange={handleChange}
            required
          >
            <option value="">Not Selected</option>
            <option value="Maize(Makka)">Maize(Makka)</option>
            <option value="Rice(Chawal)">Rice(Chawal)</option>
            <option value="Barley(Jau)">Barley(Jau)</option>
            <option value="Wheat(Gehu)">Wheat(Gehu)</option>
            <option value="Cotton(Kapaas)">Cotton(Kapaas)</option>
            <option value="Soybean">Soybean</option>
          </select>
        </div>

        <div className="form-row">
          <label>Rainfall (mm)</label>
          <input
            type="number"
            name="Rainfall_mm"
            value={formData.Rainfall_mm}
            onChange={handleChange}
            placeholder="e.g., 58"
            required
          />
        </div>

        

        <div className="form-row weather-row">
          <div className="weather-item location-item">
            <label>Weather Details</label>
            <div className="toggle-wrapper">
              <img
                src="/weath.png" 
                alt="GPS"
                className="toggle-icon"
              />
              <div
                className={`toggle ${formData.location ? "active" : ""}`}
                onClick={handleLocationClick}
              ></div>
            </div>
            <h5>Use live Weather</h5>
          </div>

          <div className="weather-item">
            <label>Weather Condition</label>
            <select
              name="Weather_Condition"
              value={formData.Weather_Condition}
              onChange={handleChange}
              required
            >
              <option value="">Not Selected</option>
              <option value="Sunny">Sunny</option>
              <option value="Rainy">Rainy</option>
              <option value="Cloudy">Cloudy</option>
            </select>
          </div>

          
        </div>

        <div className="form-row">
            <label>Temperature (°C)</label>
            <input
              type="number"
              name="Temperature_Celsius"
              value={formData.Temperature_Celsius}
              onChange={handleChange}
              placeholder="e.g., 32"
              required
            />
          </div>

        <div className="form-row">
          <label>Days to Harvest</label>
          <input
            type="number"
            name="Days_to_Harvest"
            value={formData.Days_to_Harvest}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Location</label>
          <div className="location-input">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter city or use GPS"
            />
          </div>
        </div>

        <div className="form-row">
          <label>Irrigation</label>
          <div
            className={`toggle ${formData.Irrigation_Used ? "active" : ""}`}
            onClick={() =>
              setFormData({
                ...formData,
                Irrigation_Used: !formData.Irrigation_Used,
              })
            }
          ></div>
        </div>

        <div className="form-row">
          <label>Fertilizer</label>
          <div
            className={`toggle ${formData.Fertilizer_Used ? "active" : ""}`}
            onClick={() =>
              setFormData({
                ...formData,
                Fertilizer_Used: !formData.Fertilizer_Used,
              })
            }
          ></div>
        </div>

        <button type="submit" className="submit-btn">
          Predict Yield
        </button>
      </form>
    </div>
  );
};

export default CropYieldForm;
