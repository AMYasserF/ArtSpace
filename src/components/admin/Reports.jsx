import React, { useState, useEffect } from "react";
import "../../css/reports.css";

const Reports = () => {
  const [reportType, setReportType] = useState("users");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchStatistics(reportType);
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reportType]);

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  return (
    <div className="reports">
      <h1>Generate Reports</h1>
      <div className="report-controls">
        <label htmlFor="reportType">Select Report Type:</label>
        <select id="reportType" onChange={handleReportTypeChange} value={reportType}>
          <option value="users">User Statistics</option>
          <option value="artworks">Artwork Statistics</option>
          <option value="auctions">Auction Statistics</option>
          <option value="aggregated">Aggregated Statistics</option>
        </select>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="report-table">
          <h2>Report: {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</h2>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
