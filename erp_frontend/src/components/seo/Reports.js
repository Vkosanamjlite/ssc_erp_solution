import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./SEOReports.css";

const SEOReports = () => {
    const [reports, setReports] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState("");

    useEffect(() => {
        axios
            .get("/api/seo/seo-reporting/")
            .then((response) => setReports(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleUrlChange = (e) => {
        setSelectedUrl(e.target.value);
    };

    const filteredReports = selectedUrl
        ? reports.filter((report) => report.page_url === selectedUrl)
        : reports;

    const chartData = {
        labels: filteredReports.map((report) => report.report_date),
        datasets: [
            {
                label: "Organic Traffic",
                data: filteredReports.map((report) => report.organic_traffic),
                borderColor: "#42A5F5",
                fill: false,
                tension: 0.1,
            },
            {
                label: "Bounce Rate",
                data: filteredReports.map((report) => report.bounce_rate),
                borderColor: "#66BB6A",
                fill: false,
                tension: 0.1,
            },
            {
                label: "Backlinks Count",
                data: filteredReports.map((report) => report.backlinks_count),
                borderColor: "#FFA726",
                fill: false,
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="seo-reports">
            <h2>SEO Reporting Dashboard</h2>
            <div className="filter-container">
                <label htmlFor="url-filter">Filter by Page URL:</label>
                <select id="url-filter" onChange={handleUrlChange}>
                    <option value="">All URLs</option>
                    {Array.from(new Set(reports.map((report) => report.page_url))).map(
                        (url, index) => (
                            <option key={index} value={url}>
                                {url}
                            </option>
                        )
                    )}
                </select>
            </div>
            <div className="chart-container">
                <Line data={chartData} options={{ responsive: true }} />
            </div>
            <table>
                <thead>
                <tr>
                    <th>Page URL</th>
                    <th>Report Date</th>
                    <th>Organic Traffic</th>
                    <th>Bounce Rate (%)</th>
                    <th>Backlinks Count</th>
                </tr>
                </thead>
                <tbody>
                {filteredReports.map((report) => (
                    <tr key={`${report.page_url}-${report.report_date}`}>
                        <td>{report.page_url}</td>
                        <td>{report.report_date}</td>
                        <td>{report.organic_traffic}</td>
                        <td>{report.bounce_rate.toFixed(2)}</td>
                        <td>{report.backlinks_count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SEOReports;
