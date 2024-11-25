// src/components/TransactionForm.js
import React, { useState, useEffect } from 'react';
import './TransactionForm.css';

function TransactionForm({ onSave, onCancel }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [date, setDate] = useState('');
    const [account, setAccount] = useState('');
    const [accounts, setAccounts] = useState([]); // List of accounts for dropdown

    // Fetch accounts to populate the dropdown
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch('/api/finance/accounts/');
                const data = await response.json();
                setAccounts(data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure all required fields are filled
        if (!account || !transactionType || !amount || !date) {
            alert("Please fill in all required fields.");
            return;
        }

        const transactionData = {
            account,
            transaction_type: transactionType,
            amount: parseFloat(amount), // Ensure amount is a decimal
            date,
            description,
        };

        onSave(transactionData);
    };

    return (
        <div className="transaction-form">
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Account</label>
                    <select
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        required
                    >
                        <option value="">Select Account</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Transaction Type</label>
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                        <option value="TRANSFER">Transfer</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">Add Transaction</button>
                    <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default TransactionForm;
