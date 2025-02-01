"use client";

import Button from "@/components/button/button";
import { useState } from "react";

export default function ElectricityEstimateForm() {
  const [formData, setFormData] = useState({
    electricity_unit: "mwh",
    electricity_value: "",
    country: "us",  // Fixed country value
    state: "fl",     // Fixed state value
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/CarbonCall/Power", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if(response.ok){
        alert(`Estimated Carbon Emission: ${result.data.attributes.carbon_kg} kg`);
    }else{
        alert(`Error : ${result.error}`)
    }
    
  };

  return (
    <div>
      <h1>Electricity Emission Estimate</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Electricity Unit:
          <select name="electricity_unit" value={formData.electricity_unit} onChange={handleChange}>
            <option value="mwh">Megawatt Hours (MWh)</option>
            <option value="kwh">Kilowatt Hours (kWh)</option>
          </select>
        </label>
        <label>
          Electricity Value:
          <input type="number" name="electricity_value" value={formData.electricity_value} onChange={handleChange} required />
        </label>
        <Button text={"Submit"} />
      </form>

    
    </div>
  );
}
