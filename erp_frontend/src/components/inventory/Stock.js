// src/components/Stock.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stock = () => {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        axios.get('/api/inventory/stock/')
            .then(response => setStock(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Stock</h2>
            <ul>
                {stock.map((item) => (
                    <li key={item.id}>{item.product.name} - {item.warehouse.name} - Quantity: {item.quantity}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stock;
