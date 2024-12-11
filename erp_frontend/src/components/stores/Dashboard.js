import React, { useState, useEffect } from "react";
import axios from "axios";
import "./store.css";

const Dashboard = () => {
    const [shops, setShops] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        location: "",
        manager: "",
        shop_type: "",
        status: "",
    });

    useEffect(() => {
        axios
            .get("/api/stores/", { params: filters })
            .then((response) => setShops(response.data))
            .catch((error) => console.error(error));
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="shopify-dashboard">
            <h2>Shopify Store Management</h2>
            <div className="search-section">
                <input
                    type="text"
                    name="name"
                    placeholder="Shop Name"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="manager"
                    placeholder="Manager"
                    onChange={handleFilterChange}
                />
                <select name="shop_type" onChange={handleFilterChange}>
                    <option value="">Shop Type</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                </select>
                <select name="status" onChange={handleFilterChange}>
                    <option value="">Shop Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Under Review">Under Review</option>
                </select>
            </div>
            <table className="shop-table">
                <thead>
                <tr>
                    <th>Shop Name</th>
                    <th>Location</th>
                    <th>Manager</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {shops.map((shop) => (
                    <tr key={shop.id} onClick={() => window.location.href = `/shop/${shop.id}`}>
                        <td>{shop.name}</td>
                        <td>{shop.location}</td>
                        <td>{shop.manager}</td>
                        <td>{shop.shop_type}</td>
                        <td>{shop.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
