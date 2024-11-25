// src/components/common/InputField.js
import React from 'react';

function InputField({ label, type = 'text', value, onChange, placeholder, options }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            {type === 'select' ? (
                <select value={value} onChange={onChange}>
                    <option value="">Select</option>
                    {options && options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}

export default InputField;
