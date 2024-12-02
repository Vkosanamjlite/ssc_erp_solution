import React, {useState, useEffect} from "react";
import axios from "axios";
import "./SEOManagement.css";

const ContentOptimization = () => {
    const [content, setContent] = useState([]);
    const [formData, setFormData] = useState({
        page_url: "",
        title: "",
        meta_description: "",
        target_keywords: "",
    });

    useEffect(() => {
        axios
            .get("/api/seo/content-optimization/")
            .then((response) => setContent(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/seo/content-optimization/", formData)
            .then((response) => {
                setContent([...content, response.data]);
                setFormData({page_url: "", title: "", meta_description: "", target_keywords: ""});
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="content-optimization">
            <h2>Content Optimization</h2>
            <table>
                <thead>
                <tr>
                    <th>Page URL</th>
                    <th>Title</th>
                    <th>Meta Description</th>
                    <th>Keywords</th>
                </tr>
                </thead>
                <tbody>
                {content.map((item) => (
                    <tr key={item.id}>
                        <td>{item.page_url}</td>
                        <td>{item.title}</td>
                        <td>{item.meta_description}</td>
                        <td>{item.target_keywords}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <h3>Add New Metadata</h3>
                <input
                    type="url"
                    placeholder="Page URL"
                    value={formData.page_url}
                    onChange={(e) => setFormData({...formData, page_url: e.target.value})}
                    required
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                />
                <textarea
                    placeholder="Meta Description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                    required
                />
                <input
                    type="text"
                    placeholder="Keywords (comma-separated)"
                    value={formData.target_keywords}
                    onChange={(e) => setFormData({...formData, target_keywords: e.target.value})}
                    required
                />
                <button type="submit">Add Metadata</button>
            </form>
        </div>
    );
};

export default ContentOptimization;
