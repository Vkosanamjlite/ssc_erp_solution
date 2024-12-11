import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StoreList.css";

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        location: "",
        manager: "",
        shop_type: "",
        status: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchStores();
    }, [filters]);

    const fetchStores = () => {
        axios
            .get("/api/stores/", { params: filters })
            .then((response) => setStores(response.data))
            .catch((error) => console.error("Error fetching stores:", error));
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="store-list">
            <h2>Shopify Stores</h2>
            <div className="filter-section">
                <input
                    type="text"
                    name="name"
                    placeholder="Shop Name"
                    value={filters.name}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={filters.location}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="manager"
                    placeholder="Manager"
                    value={filters.manager}
                    onChange={handleFilterChange}
                />
                <select
                    name="shop_type"
                    value={filters.shop_type}
                    onChange={handleFilterChange}
                >
                    <option value="">Shop Type</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                </select>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                >
                    <option value="">Shop Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Under Review">Under Review</option>
                </select>
            </div>
            <table className="store-table">
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
                {stores.map((store) => (
                    <tr key={store.id} onClick={() => navigate(`/store/${store.id}`)}>
                        <td>{store.name}</td>
                        <td>{store.location}</td>
                        <td>{store.manager}</td>
                        <td>{store.shop_type}</td>
                        <td>{store.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoreList;
