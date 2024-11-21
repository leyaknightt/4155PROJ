'use client';
import React, { useState, useEffect } from 'react';
import '../profile/profile.css';

const EducationSection = () => {
    // State to store the list of education entries
    const [educations, setEducations] = useState([]);

    // State for new education form input
    const [newEducation, setNewEducation] = useState({
        school: '',
        degree: '',
        major: '',
        datesAttended: '',
    });

    // state to handle education being edited
    const [editEducation, setEditEducation] = useState(null);

    const fakeData = [
        {
            id: 0,
            school: 'University of North Carolina at Charlotte',
            degree: 'Bachelor of Science',
            major: 'Computer Science',
            datesAttended: '2020 -2024',
        },
    ];

    useEffect(() => {
        setEducations(fakeData);
    }, []);

    const [isFormVisible, setVisibility] = useState(false);

    // toggle visibility of the form
    const toggleFormVisibility = () => {
        setVisibility(!isFormVisible);
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEducation((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditEducation((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle adding a new education entry
    const handleAddEducation = () => {
        if (
            newEducation.school &&
            newEducation.degree &&
            newEducation.major &&
            newEducation.datesAttended
        ) {
            const newEntry = {
                id: Date.now(),
                ...newEducation,
            }
            setEducations((prev) => [...prev, newEntry]);
            setNewEducation({
                school: '',
                degree: '',
                major: '',
                datesAttended: '',
            });
        } else {
            alert('Please fill in all fields.');
        }
    };

    // Handle deleting an education entry
    const handleDeleteEducation = (index) => {
        setEducations((prev) => prev.filter((education) => education.id !== index));
    };

    // Handle editing an education entry
    const handleEditEducation = (index) => {
        const education = educations[index];
        setEditEducation(education);
        //handleDeleteEducation(index); // Remove the entry being edited
    };

    // Save the edited education entry
    const handleSaveEdit = () => {
        setEducations((prev) =>
            prev.map((education) =>
                education.id === editEducation.id ? { ...editEducation } : education
            )
        );
        setEditEducation(null); // Clear edit form after saving
    };

    // Cancel editing and clear the form
    const handleCancelEdit = () => {
        setEditEducation(null);
    };

    return (
        <div>

            {/* Form for adding or editing education */}
            <div>
                <button onClick={toggleFormVisibility}>
                    {isFormVisible ? '-' : '+'}
                </button>
                {isFormVisible && (
                    <form >
                        <input
                            type="text"
                            name="school"
                            value={newEducation.school}
                            onChange={handleInputChange}
                            placeholder="School Name"
                        />
                        <input
                            type="text"
                            name="degree"
                            value={newEducation.degree}
                            onChange={handleInputChange}
                            placeholder="Degree"
                        />
                        <input
                            type="text"
                            name="datesAttended"
                            value={newEducation.datesAttended}
                            onChange={handleInputChange}
                        />
                        <input type="text"
                            name="major"
                            value={newEducation.major}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleAddEducation}> Add Education</button>
                    </form>)

                }
            </div>
            {/* Edit education form; visible when editing */}
            {editEducation && (
                <form >
                    <input
                        type="text"
                        name="school"
                        value={editEducation.school}
                        onChange={handleInputChange}
                        placeholder="School Name"
                    />
                    <input
                        type="text"
                        name="degree"
                        value={editEducation.degree}
                        onChange={handleEditChange}
                        placeholder="Degree"
                    />
                    <input
                        type="text"
                        name="datesAttended"
                        value={editEducation.datesAttended}
                        onChange={handleEditChange}
                    />
                    <input type="text"
                        name="major"
                        value={editEducation.major}
                        onChange={handleEditChange}
                    />
                    <button onClick={handleSaveEdit}>Save Changes</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </form>
            )}


            {/* Display list of education entries */}
            {!editEducation && (
                <ul>
                {educations.map((education) => (
                    <li key={education.id} className='card-info'>
                        <h3> <strong>School: </strong> {education.school}</h3>
                        <p><strong>Degree:</strong> {education.degree}</p>
                        <p><strong>Major:</strong> {education.major}</p>
                        <p><strong>Years Attended:</strong> {education.datesAttended}</p>
                        <button className='education-btn' onClick={() => handleEditEducation(education.id)}>Edit</button>
                        <button className='education-btn' onClick={() => handleDeleteEducation(education.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            )}
            
        </div>
    );
};

export default EducationSection;
