// src/components/finance/Accounts.js
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import AccountForm from './AccountForm';
import Modal from "../model/Modal";
import './Accounts.css';

function Accounts() {
    const [accounts, setAccounts] = useState([]); // Accounts data
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false); // Controls modal visibility
    const [selectedAccount, setSelectedAccount] = useState(null); // For edit functionality
    const resultsPerPage = 10;

    // Fetch accounts data
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

    // Filter accounts based on search term
    const filteredAccounts = accounts.filter(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredAccounts.slice(indexOfFirstResult, indexOfLastResult);

    // Handle Add Account click
    const handleAddClick = () => {
        setSelectedAccount(null); // Clear selected account for new entry
        setShowModal(true);
    };

    // Handle Edit Account click
    const handleEditClick = (account) => {
        setSelectedAccount(account); // Load account data into form
        setShowModal(true);
    };

    // Handle Delete Account
    const handleDelete = async (id) => {
        try {
            await fetch(`/api/finance/accounts/${id}/`, {
                method: 'DELETE',
            });
            setAccounts(accounts.filter(account => account.id !== id));
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    // Handle saving of account data
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

            setShowModal(false);
            setSelectedAccount(null);
        } catch (error) {
            console.error("Error saving account:", error);
        }
    };

    // Handle modal close
    const handleCancel = () => {
        setShowModal(false);
        setSelectedAccount(null);
    };

    return (
        <div className="accounts-section">
            <div className="accounts-header">
                <h3>Accounts</h3>
                <button onClick={handleAddClick} className="add-account-btn">+</button>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-container">
                <table className="account-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th className="table-action">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentResults.map(account => (
                        <tr key={account.id}>
                            <td>{account.name}</td>
                            <td>{account.account_type}</td>
                            <td>{account.balance}</td>
                            <td className="table-action">
                                <button onClick={() => handleEditClick(account)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(account.id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                totalResults={filteredAccounts.length}
                resultsPerPage={resultsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {showModal && (
                <Modal onClose={handleCancel}>
                    <AccountForm
                        account={selectedAccount}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Accounts;
