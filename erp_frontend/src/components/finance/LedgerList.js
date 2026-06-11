import React from 'react';

const LedgerList = ({ ledgerEntries }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Account</th>
                <th>Debit</th>
                <th>Credit</th>
            </tr>
            </thead>
            <tbody>
            {ledgerEntries.map((entry) => (
                <tr key={entry.id}>
                    <td>{entry.date}</td>
                    <td>{entry.account.name}</td>
                    <td>{entry.debit}</td>
                    <td>{entry.credit}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default LedgerList;
