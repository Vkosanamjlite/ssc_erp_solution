import React from 'react';
import AccountForm from './AccountForm';

const ParentComponent = () => {
    const handleAccountSubmit = (formData) => {
        console.log('Form Data Submitted:', formData);

        fetch('http://127.0.0.1:8000/api/finance/accounts/', { // Correct backend API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Account created successfully:', data);
            })
            .catch((error) => {
                console.error('Error creating account:', error);
            });
    };

    return (
        <div>
            <h1>Create New Account</h1>
            <AccountForm onSubmit={handleAccountSubmit} />
        </div>
    );
};

export default ParentComponent;
