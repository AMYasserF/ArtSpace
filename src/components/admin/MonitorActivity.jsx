import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../../css/monitorActivities.css";


Chart.register(...registerables);

const MonitorActivities = () => {
  const [metrics, setMetrics] = useState([]);
  const [graphData, setGraphData] = useState(null);

  
  useEffect(() => {
    
    const dummyMetrics = [
      { name: "Total Users", count: 1500 },
      { name: "Active Auctions", count: 30 },
      { name: "Total Artworks", count: 3000 },
      { name: "Sales This Month", count: "$25,000" },
    ];

    // graph data
    const dummyGraphData = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Platform Activity",
          data: [100, 200, 150, 300, 250], // Y-axis values
          fill: true,
          borderColor: "#c5a900", 
          backgroundColor: "rgba(197, 169, 0, 0.2)", 
          pointBackgroundColor: "#c5a900",
          tension: 0.4, // Curve the line
        },
      ],
    };

    //  dummy data
    setMetrics(dummyMetrics);
    setGraphData(dummyGraphData);
  }, []);

  return (
    <div className="monitor-activities">
      <h1>Monitor Platform Activities</h1>

      {/* Metrics Section */}
      <div className="stats-cards">
        {metrics.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.name}</h3>
            <p>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Graph Section */}
      <div className="chart-container">
        <h2>Platform Activity Over Time</h2>
        {graphData ? (
          <Line
            data={graphData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Activity Count",
                  },
                },
              },
            }}
          />
        ) : (
          <p>Loading graph data...</p>
        )}
      </div>
    </div>
  );
};

export default MonitorActivities;
