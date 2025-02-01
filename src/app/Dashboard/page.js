"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmissionsDashboard() {
  const [emissions, setEmissions] = useState({
    flightEmissions: 0,
    fuelEmissions: 0,
    powerEmissions: 0,
    shippingEmissions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmissions() {
      try {
        const response = await fetch("/api/Dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch emissions data");
        }
        const data = await response.json();
        setEmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    }
    fetchEmissions();
  }, []);

  if (loading) return <p className="loading">Loading emissions data...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  // Prepare the chart data
  const chartData = {
    labels: ["Flight Emissions", "Fuel Emissions", "Power Emissions", "Shipping Emissions"],
    datasets: [
      {
        label: "Carbon Emissions (kg)",
        data: [
          emissions.flightEmissions,
          emissions.fuelEmissions,
          emissions.powerEmissions,
          emissions.shippingEmissions,
        ],
        backgroundColor: [
          "rgba(27, 94, 32, 0.85)",
          "rgba(76, 175, 80, 0.85)",
          "rgba(129, 199, 132, 0.85)",
          "rgba(200, 230, 201, 0.85)",
        ],
        borderColor: [
          "rgba(27, 94, 32, 1)",
          "rgba(76, 175, 80, 1)",
          "rgba(129, 199, 132, 1)",
          "rgba(200, 230, 201, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { size: 16 },
          color: "#1B5E20",
        },
      },
      tooltip: {
        titleFont: { size: 18 },
        bodyFont: { size: 14 },
      },
    },
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Carbon Footprint Dashboard</h1>
      </header>

      <main>
        <section className="card">
          <div className="info">
            <h2>Emissions Summary</h2>
            <ul>
              <li>
                <span className="label">Flight Emissions:</span>
                <span className="value">{emissions.flightEmissions} kg</span>
              </li>
              <li>
                <span className="label">Fuel Emissions:</span>
                <span className="value">{emissions.fuelEmissions} kg</span>
              </li>
              <li>
                <span className="label">Power Emissions:</span>
                <span className="value">{emissions.powerEmissions} kg</span>
              </li>
              <li>
                <span className="label">Shipping Emissions:</span>
                <span className="value">{emissions.shippingEmissions} kg</span>
              </li>
            </ul>
          </div>

          {/* Enlarged and animated chart container */}
          <motion.div
            className="chart"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Pie data={chartData} options={chartOptions} />
          </motion.div>
        </section>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;500;700&display=swap');

        /* Dashboard container with classic gradient */
        .dashboard {
          background: linear-gradient(135deg, #f9f9f9, #ffffff);
          min-height: 100vh;
          padding: 2rem 1rem;
          font-family: 'Helvetica Neue', sans-serif;
          color: #333;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        header {
          margin-bottom: 2rem;
          text-align: center;
        }

        header h1 {
          font-size: 2.2rem;
          color: #333;
          margin: 0;
        }

        main {
          width: 100%;
          max-width: 1200px;
          display: flex;
          justify-content: center;
        }

        /* Card styling with larger pie chart */
        .card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          width: 100%;
        }

        .info {
          flex: 1 1 300px;
          min-width: 250px;
        }

        .info h2 {
          font-size: 1.6rem;
          color: #555;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 0.3rem;
          margin-bottom: 0.8rem;
        }

        .info ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .info li {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          font-size: 1rem;
        }

        .label {
          font-weight: 500;
          color: #777;
        }

        .value {
          font-weight: 700;
          color: #333;
        }

        /* Enlarged chart container */
        .chart {
          flex: 1 1 800px;
          min-width: 500px;
          aspect-ratio: 1;
          position: relative;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }
        .chart canvas {
          position: absolute;
          width: 100% !important;
          height: 100% !important;
        }

        @media (max-width: 768px) {
          header h1 {
            font-size: 1.8rem;
          }
          .info h2 {
            font-size: 1.4rem;
          }
          .chart {
            aspect-ratio: 1;
            min-width: 280px;
          }
        }
      `}</style>
    </div>
  );
}
