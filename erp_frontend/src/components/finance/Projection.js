// src/components/Projection.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js features automatically
import './Projection.css';

function Projection() {
    const [numMonths, setNumMonths] = useState(1); // Default to 1 month projection
    const [projectionData, setProjectionData] = useState(null); // Stores data fetched from API

    // Fetch projections from the backend API
    useEffect(() => {
        const fetchProjections = async () => {
            try {
                const response = await fetch(`/api/finance/projection/?months=${numMonths}`);
                const data = await response.json();
                setProjectionData(data);  // Update the state with projection data
            } catch (error) {
                console.error("Error fetching projection data:", error);
            }
        };
        fetchProjections();
    }, [numMonths]);

    // Prepare data for chart rendering only if projectionData is available
    const chartData = projectionData && {
        labels: Array.from({ length: projectionData.months }, (_, i) => `Month ${i + 1}`),
        datasets: [
            {
                label: `Projected Income for Next ${projectionData.months} Months`,
                data: projectionData.projected_income,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.3
            },
            {
                label: `Projected Expenses for Next ${projectionData.months} Months`,
                data: projectionData.projected_expense,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.3
            }
        ]
    };

    return (
        <div className="projection-section">
            <h3>Projections</h3>

            {/* Input for selecting projection period */}
            <div className="projection-input">
                <label>
                    Project for next
                    <input
                        type="number"
                        min="1"
                        max="12"
                        value={numMonths}
                        onChange={(e) => setNumMonths(parseInt(e.target.value))}
                    />
                    months
                </label>
            </div>

            {/* Display the Line Chart only if projection data is available */}
            <div className="projection-chart">
                {projectionData ? (
                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                ) : (
                    <p>Loading projection data...</p>
                )}
            </div>
        </div>
    );
}

export default Projection;
