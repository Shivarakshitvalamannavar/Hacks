"use client";

import { useState } from "react";
import Button from "@/components/button/button";
import "../../../styles/formPage.css"; // Import the CSS file

export default function FuelForm() {
  const [formData, setFormData] = useState({
    type: "fuel_combustion",
    fuel_source_type: "",
    fuel_source_unit: "",
    fuel_source_value: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/CarbonCall/Fuel", {
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

  const fuelUnits = {
    bit: ["short_ton", "btu"],
    dfo: ["gallon", "btu"],
    jf: ["gallon", "btu"],
    ker: ["gallon", "btu"],
    lig: ["short_ton", "btu"],
    msw: ["short_ton", "btu"],
    ng: ["thousand_cubic_feet", "btu"],
    pc: ["gallon", "btu"],
    pg: ["gallon", "btu"],
    rfo: ["gallon", "btu"],
    sub: ["short_ton", "btu"],
    tdf: ["short_ton", "btu"],
    wo: ["barrel", "btu"],
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Fuel Combustion Estimation</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="label">Fuel Source Type:</label>
            <select
              name="fuel_source_type"
              value={formData.fuel_source_type}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select Fuel Source Type</option>
              <option value="bit">Bituminous Coal</option>
              <option value="dfo">Home Heating and Diesel Fuel (Distillate)</option>
              <option value="jf">Jet Fuel</option>
              <option value="ker">Kerosene</option>
              <option value="lig">Lignite Coal</option>
              <option value="msw">Municipal Solid Waste</option>
              <option value="ng">Natural Gas</option>
              <option value="pc">Petroleum Coke</option>
              <option value="pg">Propane Gas</option>
              <option value="rfo">Residual Fuel Oil</option>
              <option value="sub">Subbituminous Coal</option>
              <option value="tdf">Tire-Derived Fuel</option>
              <option value="wo">Waste Oil</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Fuel Source Unit:</label>
            {fuelUnits[formData.fuel_source_type] ? (
              <select
                name="fuel_source_unit"
                value={formData.fuel_source_unit}
                onChange={handleChange}
                required
                className="input"
              >
                {fuelUnits[formData.fuel_source_type].map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="fuel_source_unit"
                value=""
                disabled
                className="input"
              >
                <option>Select Fuel Source Type first</option>
              </select>
            )}
          </div>
          <div className="form-group">
            <label className="label">Fuel Source Value:</label>
            <input
              type="number"
              name="fuel_source_value"
              value={formData.fuel_source_value}
              onChange={handleChange}
              required
              className="input"
              min="0"
            />
          </div>
          <Button text={"Submit"} />
        </form>
      </div>
    </div>
  );
}