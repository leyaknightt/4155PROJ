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
    const handleAddEducation = (e) => {
        e.preventDefault();
        if (
            newEducation.school &&
            newEducation.degree &&
            newEducation.major &&
            newEducation.datesAttended
        ) {
           
            setEducations((prev) => [...prev, newEducation]);
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
        setEducations((prev) => prev.filter((_, idx) => idx !== index));
    };

    // Handle editing an education entry
    const handleEditEducation = (index) => {
        const education = educations[index];
        setEditEducation(education);
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
                    <form className='edit-frm'>
                        <div>
                            <label htmlFor="school">School: </label>
                            <input
                            type="text"
                            name="school"
                            value={newEducation.school}
                            onChange={handleInputChange}
                            placeholder="School Name"
                        />
                        </div>
                        <div>
                            <label htmlFor="degree">Degree: </label>
                           <input
                            type="text"
                            name="degree"
                            value={newEducation.degree}
                            onChange={handleInputChange}
                            placeholder="Bachelor of Science"
                        /> 
                        </div>
                        <div>
                            <label htmlFor="datesAttended">Dates Attended: </label>
                           <input
                            type="text"
                            name="datesAttended"
                            value={newEducation.datesAttended}
                            onChange={handleInputChange}
                            placeholder='2020-2024'
                        /> 
                        </div>
                        <div>
                            <label htmlFor="major">Major: </label>
                           <input type="text"
                            name="major"
                            value={newEducation.major}
                            onChange={handleInputChange}
                            placeholder='Enter your major here'
                        /> 
                        </div>
                        <button onClick={handleAddEducation}> Add Education</button>
                    </form>)
                }
            </div>
            {/* Edit education form; visible when editing */}
            {editEducation && (
                <form name='edit' className='edit-frm' >
                    <div>
                        <label htmlFor="school">School: </label>
                        <input
                        type="text"
                        name="school"
                        value={editEducation.school}
                        onChange={handleEditChange}
                        placeholder="School Name"
                    />
                    </div>
                    <div>
                        <label htmlFor="degree">Degree: </label>
                        <input
                        type="text"
                        name="degree"
                        value={editEducation.degree}
                        onChange={handleEditChange}
                        placeholder="Degree"
                    />
                    </div>
                    <div>
                        <label htmlFor="datesAttended">Dates Attended: </label>
                       <input
                        type="text"
                        name="datesAttended"
                        value={editEducation.datesAttended}
                        onChange={handleEditChange}
                    /> 
                    </div>
                    <div>
                        <label htmlFor="major">Major: </label>
                       <input type="text"
                        name="major"
                        value={editEducation.major}
                        onChange={handleEditChange}
                    /> 
                    </div>
                    <button onClick={handleSaveEdit}>Save Changes</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </form>
            )}

            {/* Display list of education entries */}
            {!editEducation && (
                <ul>
                {educations.map((education, idx) => (
                    <li key={idx} className='card-info'>
                        <h3> <strong>School: </strong> {education.school}</h3>
                        <p><strong>Degree:</strong> {education.degree}</p>
                        <p><strong>Major:</strong> {education.major}</p>
                        <p><strong>Years Attended:</strong> {education.datesAttended}</p>
                        <button className='education-btn' onClick={() => handleEditEducation(idx)}>Edit</button>
                        <button className='education-btn' onClick={() => handleDeleteEducation(idx)}>Delete</button>
                    </li>
                ))}
            </ul>
            )}
            
        </div>
    );
};

export default EducationSection;
