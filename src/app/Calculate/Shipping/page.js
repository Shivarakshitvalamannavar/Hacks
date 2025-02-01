"use client";

import { useState } from "react";
import Button from "@/components/button/button";
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
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Shipping Carbon Estimation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Weight Input */}
        <div>
          <label>Weight:</label>
          <input
            type="number"
            name="weight_value"
            value={formData.weight_value}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Weight Unit Selection */}
        <div>
          <label>Weight Unit:</label>
          <select name="weight_unit" value={formData.weight_unit} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="g">Grams (g)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="mt">Tonnes (mt)</option>
          </select>
        </div>

        {/* Distance Input */}
        <div>
          <label>Distance:</label>
          <input
            type="number"
            name="distance_value"
            value={formData.distance_value}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Distance Unit Selection */}
        <div>
          <label>Distance Unit:</label>
          <select name="distance_unit" value={formData.distance_unit} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="km">Kilometers (km)</option>
            <option value="mi">Miles (mi)</option>
          </select>
        </div>

        {/* Transport Method */}
        <div>
          <label>Transport Method:</label>
          <select name="transport_method" value={formData.transport_method} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="truck">Truck</option>
            <option value="train">Train</option>
            <option value="ship">Ship</option>
            <option value="plane">Plane</option>
          </select>
        </div>

        <Button text={"Submit"}/>
      </form>
    </div>
  );
}
