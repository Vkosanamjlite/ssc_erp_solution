import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/users';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [editUserId, setEditUserId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            setMessage('Error fetching users');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editUserId) {
                await updateUser(editUserId, formData);
                setMessage('User updated successfully');
            } else {
                await createUser(formData);
                setMessage('User created successfully');
            }
            fetchUsers();
            setFormData({ username: '', email: '', password: '' });
            setEditUserId(null);
        } catch (error) {
            setMessage('Error saving user');
        }
    };

    const handleEdit = (user) => {
        setFormData({ username: user.username, email: user.email });
        setEditUserId(user.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setMessage('User deleted successfully');
            fetchUsers();
        } catch (error) {
            setMessage('Error deleting user');
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {!editUserId && (
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                )}
                <button type="submit">{editUserId ? 'Update' : 'Create'}</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => handleEdit(user)}>Edit</button>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;
