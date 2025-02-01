"use client";

import Button from "@/components/button/button";
import { useState } from "react";

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
    if(response.ok){
        alert(`Estimated Carbon Emission: ${result.data.attributes.carbon_kg} kg`);
    }else{
        alert(`Error : ${result.error}`)
    }

  };

  return (
    <div>
      <h1>Flight Emission Estimate</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Passengers:
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
            required
          />
        </label>

        {formData.legs.map((leg, index) => (
          <div key={index}>
            <label>
              Departure Airport:
              <select value={leg.departure_airport} onChange={(e) => handleChange(e, index, "departure_airport")}>
                <option value="DEL">Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="BLR">Bangalore (BLR)</option>
                <option value="MAA">Chennai (MAA)</option>
                <option value="HYD">Hyderabad (HYD)</option>
              </select>
            </label>

            <label>
              Destination Airport:
              <select value={leg.destination_airport} onChange={(e) => handleChange(e, index, "destination_airport")}>
                <option value="DEL">Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="BLR">Bangalore (BLR)</option>
                <option value="MAA">Chennai (MAA)</option>
                <option value="HYD">Hyderabad (HYD)</option>
              </select>
            </label>
          </div>
        ))}

        <button type="button" onClick={addLeg}>Add Flight Leg</button>
        <Button text={"Submit"}/>
      </form>


    </div>
  );
}
