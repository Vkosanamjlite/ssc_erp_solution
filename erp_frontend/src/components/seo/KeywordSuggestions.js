import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KeywordSuggestion.css";

const KeywordSuggestion = () => {
    const [keywords, setKeywords] = useState([]);
    const [filteredKeywords, setFilteredKeywords] = useState([]);
    const [competitionFilter, setCompetitionFilter] = useState("All");
    const [searchVolumeFilter, setSearchVolumeFilter] = useState([0, 1000000]);
    const [formData, setFormData] = useState({
        keyword: "",
        search_volume: "",
        competition_level: "",
    });

    useEffect(() => {
        // Fetch keyword suggestions from the API
        axios
            .get("/api/seo/keyword-suggestions/")
            .then((response) => {
                setKeywords(response.data);
                setFilteredKeywords(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleFilterChange = () => {
        const filtered = keywords.filter((kw) => {
            const withinVolume = kw.search_volume >= searchVolumeFilter[0] && kw.search_volume <= searchVolumeFilter[1];
            const matchesCompetition = competitionFilter === "All" || kw.competition_level === competitionFilter;
            return withinVolume && matchesCompetition;
        });
        setFilteredKeywords(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/seo/keyword-suggestions/", formData)
            .then((response) => {
                setKeywords([...keywords, response.data]);
                setFormData({ keyword: "", search_volume: "", competition_level: "" });
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="keyword-suggestion">
            <h2>Keyword Suggestions</h2>

            {/* Filters */}
            <div className="filter-container">
                <label>Competition Level:</label>
                <select
                    value={competitionFilter}
                    onChange={(e) => {
                        setCompetitionFilter(e.target.value);
                        handleFilterChange();
                    }}
                >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label>Search Volume Range:</label>
                <input
                    type="number"
                    placeholder="Min"
                    value={searchVolumeFilter[0]}
                    onChange={(e) => {
                        setSearchVolumeFilter([+e.target.value, searchVolumeFilter[1]]);
                        handleFilterChange();
                    }}
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={searchVolumeFilter[1]}
                    onChange={(e) => {
                        setSearchVolumeFilter([searchVolumeFilter[0], +e.target.value]);
                        handleFilterChange();
                    }}
                />
            </div>

            {/* Keyword Table */}
            <table>
                <thead>
                <tr>
                    <th>Keyword</th>
                    <th>Search Volume</th>
                    <th>Competition Level</th>
                    <th>Suggested Date</th>
                </tr>
                </thead>
                <tbody>
                {filteredKeywords.map((kw) => (
                    <tr key={kw.id}>
                        <td>{kw.keyword}</td>
                        <td>{kw.search_volume}</td>
                        <td>{kw.competition_level}</td>
                        <td>{kw.suggested_date}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Add New Keyword Form */}
            <form onSubmit={handleSubmit}>
                <h3>Add New Keyword</h3>
                <input
                    type="text"
                    placeholder="Keyword"
                    value={formData.keyword}
                    onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Search Volume"
                    value={formData.search_volume}
                    onChange={(e) => setFormData({ ...formData, search_volume: e.target.value })}
                    required
                />
                <select
                    value={formData.competition_level}
                    onChange={(e) => setFormData({ ...formData, competition_level: e.target.value })}
                    required
                >
                    <option value="">Select Competition Level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit">Add Keyword</button>
            </form>
        </div>
    );
};

export default KeywordSuggestion;
