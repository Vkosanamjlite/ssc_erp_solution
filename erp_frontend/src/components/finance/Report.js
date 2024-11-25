// src/components/Report.js
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js features automatically
import './Report.css';

function Report() {
    const [transactions, setTransactions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [accountType, setAccountType] = useState('');

    // Fetch transactions from API
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/finance/transactions/');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        fetchTransactions();
    }, []);

    // Filter transactions based on user input
    useEffect(() => {
        const filtered = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            const matchesDate = (!start || transactionDate >= start) && (!end || transactionDate <= end);
            const matchesType = !accountType || transaction.transaction_type === accountType;
            return matchesDate && matchesType;
        });
        setFilteredData(filtered);
    }, [startDate, endDate, accountType, transactions]);

    // Prepare data for charts
    const chartData = {
        labels: filteredData.map(t => t.date),
        datasets: [
            {
                label: 'Transaction Amounts',
                data: filteredData.map(t => t.amount),
                backgroundColor: 'rgba(0, 123, 255, 0.6)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
            }
        ]
    };

    const transactionTypes = filteredData.reduce((acc, transaction) => {
        acc[transaction.transaction_type] = (acc[transaction.transaction_type] || 0) + transaction.amount;
        return acc;
    }, {});

    const pieData = {
        labels: Object.keys(transactionTypes),
        datasets: [
            {
                data: Object.values(transactionTypes),
                backgroundColor: ['#4CAF50', '#FF6384', '#FFCE56'],
            }
        ]
    };

    return (
        <div className="report-section">
            <h3>Reports</h3>

            {/* Filters Section */}
            <div className="filters">
                <label>
                    From Date:
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label>
                    To Date:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </label>
                <label>
                    Account Type:
                    <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                        <option value="TRANSFER">Transfer</option>
                    </select>
                </label>
            </div>

            {/* Charts Section */}
            <div className="charts">
                <div className="chart">
                    <h4>Transaction Amount Over Time</h4>
                    <Line data={chartData} />
                </div>

                <div className="chart">
                    <h4>Transaction Type Distribution</h4>
                    <Pie data={pieData} />
                </div>

                <div className="chart">
                    <h4>Total Amount by Transaction Type</h4>
                    <Bar data={chartData} />
                </div>
            </div>
        </div>
    );
}

export default Report;
