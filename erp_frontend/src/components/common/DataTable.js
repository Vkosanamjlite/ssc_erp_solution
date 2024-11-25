// src/components/common/DataTable.js
import React from 'react';

function DataTable({ columns, data }) {
    return (
        <table>
            <thead>
            <tr>
                {columns.map(col => <th key={col.field}>{col.label}</th>)}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                    {columns.map(col => (
                        <td key={col.field}>{row[col.field]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default DataTable;
