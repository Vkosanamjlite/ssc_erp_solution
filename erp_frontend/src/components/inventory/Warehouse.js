// src/components/Warehouse.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Warehouse = () => {
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        axios.get('/api/inventory/warehouses/')
            .then(response => setWarehouses(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Warehouses</h2>
            <ul>
                {warehouses.map((warehouse) => (
                    <li key={warehouse.id}>{warehouse.name} - {warehouse.location}</li>
                ))}
            </ul>
        </div>
    );
};

export default Warehouse;
