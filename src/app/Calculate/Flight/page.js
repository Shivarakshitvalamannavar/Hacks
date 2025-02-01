"use client";

import Button from "@/components/button/button";
import { useState } from "react";
import "../../../styles/formPage.css"; // Import the CSS file

export default function FlightEstimateForm() {
  const [formData, setFormData] = useState({
    passengers: 1,
    distance_unit: "km",
    legs: [{ departure_airport: "DEL", destination_airport: "BOM" }],
  });

  const handleChange = (e, index, field) => {
    const updatedLegs = [...formData.legs];
    updatedLegs[index][field] = e.target.value;
    setFormData({ ...formData, legs: updatedLegs });
  };

  const addLeg = () => {
    setFormData({
      ...formData,
      legs: [...formData.legs, { departure_airport: "", destination_airport: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/CarbonCall/Flight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert(`Estimated Carbon Emission: ${result.data.attributes.carbon_kg} kg`);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Flight Emission Estimate</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="label">Passengers:</label>
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
              required
              className="input"
            />
          </div>

          {formData.legs.map((leg, index) => (
            <div key={index} className="form-group">
              <label className="label">Departure Airport:</label>
              <select
                value={leg.departure_airport}
                onChange={(e) => handleChange(e, index, "departure_airport")}
                className="input"
              >
                <option value="DEL">Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="BLR">Bangalore (BLR)</option>
                <option value="MAA">Chennai (MAA)</option>
                <option value="HYD">Hyderabad (HYD)</option>
              </select>

              <label className="label">Destination Airport:</label>
              <select
                value={leg.destination_airport}
                onChange={(e) => handleChange(e, index, "destination_airport")}
                className="input"
              >
                <option value="DEL">Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="BLR">Bangalore (BLR)</option>
                <option value="MAA">Chennai (MAA)</option>
                <option value="HYD">Hyderabad (HYD)</option>
              </select>
            </div>
          ))}

          <button type="button" onClick={addLeg} className="add-leg-button">
            Add Flight Leg
          </button>
          <Button text={"Submit"} />
        </form>
      </div>
    </div>
  );
}