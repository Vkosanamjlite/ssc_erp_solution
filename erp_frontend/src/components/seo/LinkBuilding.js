import React, {useState, useEffect} from "react";
import axios from "axios";
import "./SEOManagement.css";

const LinkBuilding = () => {
    const [links, setLinks] = useState([]);
    const [filter, setFilter] = useState("All");
    const [formData, setFormData] = useState({
        url: "",
        anchor_text: "",
        domain_authority: 0,
    });

    useEffect(() => {
        axios
            .get("/api/seo/link-building/")
            .then((response) => setLinks(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/seo/link-building/", formData)
            .then((response) => {
                setLinks([...links, response.data]);
                setFormData({url: "", anchor_text: "", domain_authority: 0});
            })
            .catch((error) => console.error(error));
    };

    const filteredLinks = filter === "All" ? links : links.filter((link) => link.status === filter);

    return (
        <div className="link-building">
            <h2>Link Building</h2>
            <div className="filter-container">
                <label>Status Filter:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <table>
                <thead>
                <tr>
                    <th>URL</th>
                    <th>Anchor Text</th>
                    <th>Status</th>
                    <th>Domain Authority</th>
                </tr>
                </thead>
                <tbody>
                {filteredLinks.map((link) => (
                    <tr key={link.id}>
                        <td>{link.url}</td>
                        <td>{link.anchor_text}</td>
                        <td>{link.status}</td>
                        <td>{link.domain_authority}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <h3>Add New Link</h3>
                <input
                    type="url"
                    placeholder="URL"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    required
                />
                <input
                    type="text"
                    placeholder="Anchor Text"
                    value={formData.anchor_text}
                    onChange={(e) => setFormData({...formData, anchor_text: e.target.value})}
                    required
                />
                <input
                    type="number"
                    placeholder="Domain Authority"
                    value={formData.domain_authority}
                    onChange={(e) => setFormData({...formData, domain_authority: e.target.value})}
                    required
                />
                <button type="submit">Add Link</button>
            </form>
        </div>
    );
};

export default LinkBuilding;
