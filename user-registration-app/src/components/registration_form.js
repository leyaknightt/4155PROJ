import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        resume: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('resume', formData.resume);

        try {
            const response = await axios.post('http://localhost:3000/register', data);
            alert('User registered successfully');
        } catch (error) {
            console.error(error);
            alert('Error registering user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} required /><br />
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} required /><br />
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} required /><br />
            <label>Resume:</label>
            <input type="file" name="resume" onChange={handleFileChange} required /><br />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
