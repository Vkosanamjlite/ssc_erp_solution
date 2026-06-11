import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AccountForm = ({ account, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        account_type: '',
        balance: 0.0,
    });

    // Prefill form if editing an account
    useEffect(() => {
        if (account) {
            setFormData({
                name: account.name,
                account_type: account.account_type,
                balance: account.balance,
            });
        }
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof onSave === 'function') {
            onSave(formData); // Call the onSave prop
        } else {
            console.error('onSave is not a valid function');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label>Account Type:</label>
            <select
                name="account_type"
                value={formData.account_type}
                onChange={handleChange}
                required
            >
                <option value="">Select Type</option>
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="equity">Equity</option>
            </select>

            <label>Balance:</label>
            <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                required
            />

            <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

AccountForm.propTypes = {
    account: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default AccountForm;
