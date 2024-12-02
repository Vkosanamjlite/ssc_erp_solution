import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./SEOManagement.css";

const GoogleTrends = () => {
    const [trends, setTrends] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedTrend, setSelectedTrend] = useState(null);

    useEffect(() => {
        // Fetch all Google Trends data
        axios
            .get("/api/seo/google-trends/")
            .then((response) => setTrends(response.data))
            .catch((error) => console.error("Error fetching trends:", error));
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleTrendClick = (trend) => {
        setSelectedTrend(trend);
    };

    const filteredTrends = trends.filter((trend) =>
        trend.keyword.toLowerCase().includes(search.toLowerCase())
    );

    const chartData = {
        labels: selectedTrend ? Object.keys(selectedTrend.trend_data) : [],
        datasets: [
            {
                label: selectedTrend ? `Trend for "${selectedTrend.keyword}"` : "Select a trend",
                data: selectedTrend ? Object.values(selectedTrend.trend_data) : [],
                fill: false,
                borderColor: "#42A5F5",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="google-trends">
            <h2>Google Trends</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search keyword..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <div className="trends-container">
                <table>
                    <thead>
                    <tr>
                        <th>Keyword</th>
                        <th>Fetched Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTrends.map((trend) => (
                        <tr key={trend.id}>
                            <td>{trend.keyword}</td>
                            <td>{trend.fetched_date}</td>
                            <td>
                                <button onClick={() => handleTrendClick(trend)}>View Trend</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {selectedTrend && (
                    <div className="chart-container">
                        <h3>Trend for: {selectedTrend.keyword}</h3>
                        <Line data={chartData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoogleTrends;
