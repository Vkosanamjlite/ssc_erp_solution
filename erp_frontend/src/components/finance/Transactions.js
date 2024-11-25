// src/components/Transactions.js
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import TransactionForm from './TransactionForm';
import Modal from '../model/Modal';
import './Transactions.css';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [amountFilter, setAmountFilter] = useState('');
    const [fromDateFilter, setFromDateFilter] = useState(''); // Start date filter
    const [toDateFilter, setToDateFilter] = useState('');     // End date filter
    const [accountTypeFilter, setAccountTypeFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false); // Controls modal visibility
    const resultsPerPage = 10;

    // Fetch transactions data
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/finance/transactions/');
                const data = await response.json();
                setTransactions(data);
                setFilteredTransactions(data); // Initialize filteredTransactions with all data
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        fetchTransactions();
    }, []);

    // Filter transactions based on search criteria
    useEffect(() => {
        const results = transactions.filter(transaction => {
            const matchesAmount = amountFilter === '' || transaction.amount === parseFloat(amountFilter);

            // Check if transaction date falls within the date range
            const transactionDate = new Date(transaction.date);
            const matchesDateRange =
                (!fromDateFilter || transactionDate >= new Date(fromDateFilter)) &&
                (!toDateFilter || transactionDate <= new Date(toDateFilter));

            // Check transaction type with a safe fallback
            const matchesAccountType = accountTypeFilter === '' || (transaction.transaction_type && transaction.transaction_type.includes(accountTypeFilter));

            return matchesAmount && matchesDateRange && matchesAccountType;
        });
        setFilteredTransactions(results);
    }, [amountFilter, fromDateFilter, toDateFilter, accountTypeFilter, transactions]);

    // Pagination logic
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredTransactions.slice(indexOfFirstResult, indexOfLastResult);

    // Handle Add Transaction click
    const handleAddClick = () => {
        setShowModal(true);
    };

    // Handle Save Transaction from the form
    const handleSave = async (transactionData) => {
        console.log("Transaction Data:", transactionData);  // Log data to check
        try {
            const response = await fetch(`/api/finance/transactions/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transactionData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error saving transaction:", errorData);
                return;
            }

            const newTransaction = await response.json();
            setTransactions([...transactions, newTransaction]);
            setFilteredTransactions([...filteredTransactions, newTransaction]);
            setShowModal(false);
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    // Close the modal without saving
    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="transactions-section">
            <h3>Transactions</h3>

            {/* Add Transaction Button */}
            <button onClick={handleAddClick} className="add-transaction-btn">Add Transaction</button>

            {/* Search Section */}
            <div className="search-bar">
                <input
                    type="number"
                    placeholder="Search by Amount"
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="From Date"
                    value={fromDateFilter}
                    onChange={(e) => setFromDateFilter(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="To Date"
                    value={toDateFilter}
                    onChange={(e) => setToDateFilter(e.target.value)}
                />
                <select
                    value={accountTypeFilter}
                    onChange={(e) => setAccountTypeFilter(e.target.value)}
                >
                    <option value="">Select Transaction Type</option>
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                    <option value="TRANSFER">Transfer</option>
                </select>
            </div>

            {/* Results Table */}
            <div className="results-section">
                {currentResults.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Account</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentResults.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.account}</td>
                                <td>{transaction.transaction_type}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No transactions found</p>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                totalResults={filteredTransactions.length}
                resultsPerPage={resultsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {/* Add Transaction Modal */}
            {showModal && (
                <Modal onClose={handleCancel}>
                    <TransactionForm
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Transactions;
