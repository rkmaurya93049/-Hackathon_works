import React, { useEffect, useState } from "react";
import "./OutputPage.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function OutputPage({ result, response, onPredictAgain }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (response.soil && response.crop) {
      fetch(`http://127.0.0.1:8000/yield-data?soil=${response.soil}&crop=${response.crop}`)

        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setChartData(data.data);
          } else {
            setChartData([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching yield data:", err);
          setChartData([]);
        });
    }
  }, [response]);

  return (
    <div className="output-wrapper">
      <div className="output-card">
        <div className="output-grid">
          <div className="left-column">
            <h2 className="output-title">Yield Predicted</h2>

            <div className="result-box">
              <span>Result:</span> <strong>{result} Kg / Hectare</strong>
            </div>

            <div className="response-box">
              <h3>Your Response</h3>
              <div className="response-item">
                <span>Soil type:</span>
                <span>{response.soil}</span>
              </div>
              <div className="response-item">
                <span>Crop type:</span>
                <span>{response.crop}</span>
              </div>
              <div className="response-item">
                <span>Temp:</span>
                <span>{response.temp} °C</span>
              </div>
              <div className="response-item">
                <span>Weather:</span>
                <span>{response.weather}</span>
              </div>
              <div className="response-item">
                <span>Rainfall:</span>
                <span>{response.rainfall} mm</span>
              </div>
              <div className="response-item">
                <span>Irrigation:</span>
                <span>{response.irrigation}</span>
              </div>
              <div className="response-item">
                <span>Fertilizer:</span>
                <span>{response.fertilizer}</span>
              </div>
            </div>
          </div>

          <div className="right-column">
            {/* <div className="chart-box">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="Temperature_Celsius"
                    label={{
                      value: "Temp (°C)",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Yield (kg/ha)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="Yield_kg_per_hectare"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div> */}

            <div className="button-row">
              <button className="submit-btn" onClick={onPredictAgain}>
                Predict yield again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputPage;
