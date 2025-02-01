"use client";

import { useState } from "react";
import Button from "@/components/button/button";
import "../../../styles/formPage.css"; // Import the CSS file

export default function ShippingForm() {
  const [formData, setFormData] = useState({
    weight_value: "",
    weight_unit: "g",
    distance_value: "",
    distance_unit: "km",
    transport_method: "truck",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/CarbonCall/Shipping", {
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
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Shipping Carbon Estimation</h2>
        <form onSubmit={handleSubmit} className="form">
          {/* Weight Input */}
          <div className="form-group">
            <label className="label">Weight:</label>
            <input
              type="number"
              name="weight_value"
              value={formData.weight_value}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Weight Unit Selection */}
          <div className="form-group">
            <label className="label">Weight Unit:</label>
            <select
              name="weight_unit"
              value={formData.weight_unit}
              onChange={handleChange}
              className="input"
            >
              <option value="g">Grams (g)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="mt">Tonnes (mt)</option>
            </select>
          </div>

          {/* Distance Input */}
          <div className="form-group">
            <label className="label">Distance:</label>
            <input
              type="number"
              name="distance_value"
              value={formData.distance_value}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Distance Unit Selection */}
          <div className="form-group">
            <label className="label">Distance Unit:</label>
            <select
              name="distance_unit"
              value={formData.distance_unit}
              onChange={handleChange}
              className="input"
            >
              <option value="km">Kilometers (km)</option>
              <option value="mi">Miles (mi)</option>
            </select>
          </div>

          {/* Transport Method */}
          <div className="form-group">
            <label className="label">Transport Method:</label>
            <select
              name="transport_method"
              value={formData.transport_method}
              onChange={handleChange}
              className="input"
            >
              <option value="truck">Truck</option>
              <option value="train">Train</option>
              <option value="ship">Ship</option>
              <option value="plane">Plane</option>
            </select>
          </div>

          <Button text={"Submit"} />
        </form>
      </div>
    </div>
  );
}