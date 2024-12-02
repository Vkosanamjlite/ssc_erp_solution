import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MarketResearch.css";

const MarketResearch = () => {
    const [marketData, setMarketData] = useState([]);
    const [formData, setFormData] = useState({
        industry: "",
        competitor: "",
        findings: "",
    });
    const [filter, setFilter] = useState("");
    const [sortField, setSortField] = useState("analysis_date");
    const [sortOrder, setSortOrder] = useState("desc");

    // Fetch data from API
    useEffect(() => {
        axios
            .get("/api/seo/market-research/")
            .then((response) => setMarketData(response.data))
            .catch((error) => console.error(error));
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/seo/market-research/", formData)
            .then((response) => {
                setMarketData([response.data, ...marketData]);
                setFormData({ industry: "", competitor: "", findings: "" });
            })
            .catch((error) => console.error(error));
    };

    // Filter and sort data
    const filteredData = marketData
        .filter((item) => item.industry.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];
            if (sortOrder === "asc") {
                return fieldA > fieldB ? 1 : -1;
            }
            return fieldA < fieldB ? 1 : -1;
        });

    return (
        <div className="market-research">
            <h2>Market Research</h2>

            {/* Filter and Sort */}
            <div className="controls">
                <input
                    type="text"
                    placeholder="Filter by Industry"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div>
                    <label>Sort By:</label>
                    <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                        <option value="analysis_date">Analysis Date</option>
                        <option value="industry">Industry</option>
                        <option value="competitor">Competitor</option>
                    </select>
                    <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <table>
                <thead>
                <tr>
                    <th>Industry</th>
                    <th>Competitor</th>
                    <th>Findings</th>
                    <th>Analysis Date</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.industry}</td>
                        <td>{item.competitor}</td>
                        <td>{item.findings}</td>
                        <td>{new Date(item.analysis_date).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Add Market Research Form */}
            <form onSubmit={handleSubmit}>
                <h3>Add Market Research</h3>
                <input
                    type="text"
                    placeholder="Industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Competitor"
                    value={formData.competitor}
                    onChange={(e) => setFormData({ ...formData, competitor: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Findings"
                    value={formData.findings}
                    onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
                    required
                />
                <button type="submit">Add Research</button>
            </form>
        </div>
    );
};

export default MarketResearch;
