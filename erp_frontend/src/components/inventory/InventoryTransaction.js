// src/components/InventoryTransaction.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryTransaction = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('/api/inventory/transactions/')
            .then(response => setTransactions(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Inventory Transactions</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.transaction_type} - {transaction.product.name} - Quantity: {transaction.quantity} - Warehouse: {transaction.warehouse.name} - Date: {new Date(transaction.timestamp).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryTransaction;
