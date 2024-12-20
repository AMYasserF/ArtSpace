import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../../css/monitorActivities.css";
import axios from "axios";


Chart.register(...registerables);

const MonitorActivities = () => {
  const [metrics, setMetrics] = useState([]);
  const [graphData, setGraphData] = useState(null);

  
  useEffect(() => {
    axios.get("http://localhost:3000/Admin/Statistics").then((response) => {
      const met=[
        { name: "Total Users", count: response.data.totalUsers },
        { name: "Active Auctions", count: response.data.activeAuctions },
        { name: "Total Artworks", count: response.data.totalArtworks },
        { name: "Sales This Month", count: response.data.salesThisMonth },
      ]
      setMetrics(met);
      //console.log(response.data);
      console.log(metrics);
    }).catch((err) => {
      console.log(err);});

      axios.get("http://localhost:3000/Admin/Activity").then((response) => {
        console.log(response.data);
        const GraphData = {
        labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"], // X-axis values
        datasets: [
          {
            label: "Platform Activity",
            data: [response.data.january, response.data.february,response.data.march,response.data.april,response.data.may,response.data.june,response.data.july
              ,response.data.august,response.data.september,response.data.october,response.data.november,response.data.december], // Y-axis values
            // Y-axis values
            fill: true,
            borderColor: "#c5a900", 
            backgroundColor: "rgba(197, 169, 0, 0.2)", 
            pointBackgroundColor: "#c5a900",
            tension: 0.4, // Curve the line
          },
        ],
      };
      setGraphData(GraphData);
      }).catch((err) => {
        console.log(err);});

    //  dummy data
    //setMetrics(dummyMetrics);
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
