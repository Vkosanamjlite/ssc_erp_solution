import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Store.css";

const Store = () => {
    const { id } = useParams();
    const [store, setStore] = useState(null);

    useEffect(() => {
        axios
            .get(`/api/stores/${id}/`)
            .then((response) => setStore(response.data))
            .catch((error) => console.error("Error fetching store:", error));
    }, [id]);

    if (!store) {
        return <div>Loading store details...</div>;
    }

    return (
        <div className="store-view">
            <div className="left-nav">
                <ul>
                    <li>
                        <Link to={`/store/${id}/dashboard`}>Shop Dashboard</Link>
                    </li>
                    <li>
                        <Link to={`/store/${id}/products`}>Products</Link>
                    </li>
                    <li>
                        <Link to={`/store/${id}/customers`}>Customers</Link>
                    </li>
                    <li>
                        <Link to={`/store/${id}/orders`}>Orders</Link>
                    </li>
                </ul>
            </div>
            <div className="store-details">
                <h2>{store.name}</h2>
                <p><strong>Location:</strong> {store.location}</p>
                <p><strong>Manager:</strong> {store.manager}</p>
                <p><strong>Type:</strong> {store.shop_type}</p>
                <p><strong>Status:</strong> {store.status}</p>
            </div>
        </div>
    );
};

export default Store;
