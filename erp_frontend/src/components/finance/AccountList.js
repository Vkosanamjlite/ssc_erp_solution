// src/components/AccountList.js
import React, { useState, useEffect } from 'react';
import AccountForm from './AccountForm';
import Modal from '../model/Modal';
import '../finance/AccountList.css';

function AccountList() {
    const [accounts, setAccounts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    // Fetch accounts data from the API
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

    // Open modal for adding a new account
    const handleAddClick = () => {
        setSelectedAccount(null); // Clear selected account for new entry
        setShowModal(true); // Open modal
    };

    // Open modal for editing an existing account
    const handleEditClick = (account) => {
        setSelectedAccount(account); // Load account data into form
        setShowModal(true); // Open modal
    };

    // Save account data and update list
    const handleSave = async (accountData) => {
        try {
            const response = selectedAccount
                ? await fetch(`/api/finance/accounts/${selectedAccount.id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(accountData),
                })
                : await fetch(`/api/finance/accounts/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(accountData),
                });

            const savedAccount = await response.json();
            if (selectedAccount) {
                setAccounts(accounts.map((acc) => (acc.id === savedAccount.id ? savedAccount : acc)));
            } else {
                setAccounts([...accounts, savedAccount]);
            }

            setShowModal(false); // Close modal after save
            setSelectedAccount(null);
        } catch (error) {
            console.error("Error saving account:", error);
        }
    };

    // Close the modal without saving
    const handleCancel = () => {
        setShowModal(false);
        setSelectedAccount(null);
    };

    return (
        <div className="account-list">
            <div className="account-list-header">
                <h2>Accounts</h2>
                <button onClick={handleAddClick} className="add-account-btn">+</button>
            </div>

            <ul className="accounts">
                {accounts.map((account) => (
                    <li key={account.id} className="account-item">
                        <span>{account.name} ({account.account_type})</span>
                        <button onClick={() => handleEditClick(account)} className="edit-btn">Edit</button>
                    </li>
                ))}
            </ul>

            {showModal && (
                <Modal onClose={handleCancel}>
                    <AccountForm
                        account={selectedAccount} // Pass selectedAccount or null
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </Modal>
            )}
        </div>
    );
}

export default AccountList;
