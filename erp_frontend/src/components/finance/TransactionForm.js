import React, { useState } from 'react';

const TransactionForm = ({ accounts, onSubmit }) => {
    const [formData, setFormData] = useState({
        description: '',
        debit_account: '',
        credit_account: '',
        amount: 0.0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Description:</label>
            <input name="description" value={formData.description} onChange={handleChange} required />

            <label>Debit Account:</label>
            <select name="debit_account" value={formData.debit_account} onChange={handleChange} required>
                <option value="">Select Debit Account</option>
                {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
            </select>

            <label>Credit Account:</label>
            <select name="credit_account" value={formData.credit_account} onChange={handleChange} required>
                <option value="">Select Credit Account</option>
                {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
            </select>

            <label>Amount:</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

            <button type="submit">Record Transaction</button>
        </form>
    );
};

export default TransactionForm;
