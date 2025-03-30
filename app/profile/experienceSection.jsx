'use client';
import React, { useState, useEffect } from 'react';
import '../profile/profile.css';

const ExperienceSection = () => {
    // State to store the list of experience entries
    const [experiences, setExperience] = useState([]);

    // State for new experience form input
    const [newExperience, setNewExperience] = useState({
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        jobDetails: '',
    });

    // state to handle experience being edited
    const [editExperience, setEditExperience] = useState(null);

    const fakeData = [
        {
            jobTitle: 'Software Engineer',
            company: 'Microsoft',
            startDate: 'October 2022',
            endDate: 'Present',
            jobDetails: 'Created clean and precise code',
        },
    ];

    useEffect(() => {
        setExperience(fakeData);
    }, []);

    const [isFormVisible, setVisibility] = useState(false);

    // toggle visibility of the form
    const toggleFormVisibility = () => {
        setVisibility(!isFormVisible);
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExperience((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditExperience((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle adding a new experience entry
    const handleAddExperience = (e) => {
        e.preventDefault();
        if (
            newExperience.jobTitle &&
            newExperience.company &&
            newExperience.startDate &&
            newExperience.endDate
        ) {
            setExperience((prev) => [...prev, newExperience]);
            setNewExperience({
                jobTitle: '',
                company: '',
                startDate: '',
                endDate: '',
                jobDetails: '',
            });
        } else {
            alert('Please fill in all fields.');
        }
    };

    // Handle deleting an experience entry
    const handleDeleteExperience = (index) => {
        setExperience((prev) => prev.filter((_,idx) => idx !== index));
    };

    // Handle editing an experience entry
    const handleEditExperience = (index) => {
        const exp = experiences[index];
        setEditExperience(exp);
    };

    // Save the edited eexperience entry
    const handleSaveEdit = () => {
        setExperience((prev) =>
            prev.map((exp) =>
                exp.id === editExperience.id ? { ...editExperience } : exp
            )
        );
        setEditExperience(null); // Clear edit form after saving
    };

    // Cancel editing and clear the form
    const handleCancelEdit = () => {
        setEditExperience(null);
    };

    return (
        <div>

            {/* Form for adding experience */}
            <div>
                <button onClick={toggleFormVisibility}>
                    {isFormVisible ? '-' : '+'}
                </button>
                {isFormVisible && (
                    <form className='edit-frm' >
                        <div>
                            <label htmlFor="jobTitle">Job Title: </label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={newExperience.jobTitle}
                                onChange={handleInputChange}
                                placeholder='Enter job title'
                            />
                        </div>
                        <div>
                            <label htmlFor="company">Company: </label>
                            <input
                                type="text"
                                name="company"
                                value={newExperience.company}
                                onChange={handleInputChange}
                                placeholder='Enter company name'
                            />
                        </div>
                        <div>
                            <label htmlFor="startDate">Start Date: </label>
                            <input
                                type="text"
                                name="startDate"
                                value={newExperience.startDate}
                                onChange={handleInputChange}
                                placeholder='Month Year'
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate">End Date: </label>
                            <input type="text"
                                name="endDate"
                                value={newExperience.endDate}
                                onChange={handleInputChange}
                                placeholder='Month Year'
                            />
                        </div>
                        <div>
                            <label htmlFor="jobDescr">Job Details: </label>
                            <textarea name="jobDetails"
                                value={newExperience.jobDetails}
                                onChange={handleInputChange}
                                placeholder='Add a brief description of your job responsibilities' />
                        </div>
                        <button onClick={handleAddExperience}> Add Experience</button>
                    </form>)
                }
            </div>
            {/* Edit experience form; visible when editing */}
            {editExperience && (
                <form className='edit-frm' >
                    <div>
                        <label htmlFor="jobTitle">Job Title: </label>
                        <input
                            type="text"
                            name="jobTitle"
                            value={editExperience.jobTitle}
                            onChange={handleEditChange}
                            placeholder='Enter job title'
                        />
                    </div>
                    <div>
                        <label htmlFor="company">Company: </label>
                        <input
                            type="text"
                            name="company"
                            value={editExperience.company}
                            onChange={handleEditChange}
                            placeholder='Enter company name'
                        />
                    </div>
                    <div>
                        <label htmlFor="startDate">Start Date: </label>
                        <input
                            type="text"
                            name="startDate"
                            value={editExperience.startDate}
                            onChange={handleEditChange}
                            placeholder='Month Year'
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date: </label>
                        <input type="text"
                            name="endDate"
                            value={editExperience.endDate}
                            onChange={handleEditChange}
                            placeholder='Month Year'
                        />
                    </div>
                    <div>
                        <label htmlFor="jobDetails">Job Details: </label>
                        <textarea name="jobDetails"
                            value={editExperience.jobDetails}
                            onChange={handleEditChange}
                            placeholder='Add a brief description of your job responsibilities' />
                    </div>
                    <button onClick={handleSaveEdit}>Save Changes</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </form>
            )}


            {/* Display list of experience entries */}
            {!editExperience && (
                <ul>
                    {experiences.map((exp,idx) => (
                        <li key={idx} className='card-info'>
                            <h3> <strong>Job Title: </strong> {exp.jobTitle}</h3>
                            <p><strong>Company:</strong> {exp.company}</p>
                            <p><strong>Dates of Employment:</strong> {exp.startDate} - {exp.endDate}</p>
                            <p><strong>Job Details:</strong> {exp.jobDetails}</p>
                            <button className='education-btn' onClick={() => handleEditExperience(idx)}>Edit</button>
                            <button className='education-btn' onClick={() => handleDeleteExperience(idx)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};

export default ExperienceSection;
