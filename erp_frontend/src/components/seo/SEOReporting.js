import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./SEOManagement.css";

const SEOReporting = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios
            .get("/api/seo/seo-reporting/")
            .then((response) => setReports(response.data))
            .catch((error) => console.error(error));
    }, []);

    const chartData = {
        labels: reports.map((report) => report.report_date),
        datasets: [
            {
                label: "Keyword Rankings",
                data: reports.map((report) => report.keyword_rankings.rank || 0),
                fill: false,
                borderColor: "#42A5F5",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="seo-reporting">
            <h2>SEO Reporting</h2>
            <Line data={chartData} />
            <table>
                <thead>
                <tr>
                    <th>Page URL</th>
                    <th>Organic Traffic</th>
                    <th>Bounce Rate</th>
                    <th>Backlinks Count</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                    <tr key={report.id}>
                        <td>{report.page_url}</td>
                        <td>{report.organic_traffic}</td>
                        <td>{report.bounce_rate}%</td>
                        <td>{report.backlinks_count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SEOReporting;
