// src/components/AccountForm.js
import React, { useState, useEffect } from 'react';
import './AccountForm.css';

function AccountForm({ account, onSave, onCancel }) {
    // Set initial state for form fields based on whether account data is provided
    const [name, setName] = useState(account ? account.name : '');
    const [accountType, setAccountType] = useState(account ? account.account_type : '');
    const [description, setDescription] = useState(account ? account.description : '');
    const [errors, setErrors] = useState({});

    // Update form fields if account data changes
    useEffect(() => {
        if (account) {
            setName(account.name);
            setAccountType(account.account_type);
            setDescription(account.description);
        } else {
            setName('');
            setAccountType('');
            setDescription('');
        }
    }, [account]);

    // Validate the form fields
    const validate = () => {
        const errors = {};
        if (!name) errors.name = "Account name is required.";
        if (!accountType) errors.accountType = "Account type is required.";
        return errors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            onSave({ name, account_type: accountType, description });
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="account-form">
            <h2>{account ? 'Edit Account' : 'Add Account'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Account Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Account Type</label>
                    <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    >
                        <option value="">Select Account Type</option>
                        <option value="ASSET">Asset</option>
                        <option value="LIABILITY">Liability</option>
                        <option value="EQUITY">Equity</option>
                        <option value="REVENUE">Revenue</option>
                        <option value="EXPENSE">Expense</option>
                    </select>
                    {errors.accountType && <span className="error">{errors.accountType}</span>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">{account ? 'Update Account' : 'Add Account'}</button>
                    <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AccountForm;
