"use client";
import React, { useState } from 'react';
import '../profile/profile.css';
import Tag from './tag';

export default function Profile() {
    // random tags for testing
    const [sections, setSections] = useState({
        skills: [
            {index: 1, text:"HTML"},
            {index: 2, text:"Java"} , 
            {index:3, text:"Python"}

        ],
        interests: [
            {index:4, text:"Coding"},
            {index:5, text: "Painting"},
            {index:6, text:"Gaming"}
        ],
    });

    //function to delete tag by filtering index
    function deleteTag(section, tagId) {
        setSections((prevSections) => ({
            ...prevSections,
            [section]: prevSections[section].filter((tag) => tag.index !== tagId),
        }));

    };

    // function to add new tags
    function addTag(section) {
        const newTagContent = prompt("Write here");
       if (newTagContent) {
            const newTag = {
                index: Date.now(), //create a unique index
                text: newTagContent,
            };
            setSections((prevSections) => ({
                ...prevSections,
                [section]: [...prevSections[section], newTag],
            }))
        }
    };


    return (
        <>
            <h1>Profile</h1>
            <main className="profile">
                <div className="personal-info">
                    {/* Profile Image */}
                    <img
                        src="./assets/alice.jpg"
                        alt="Profile Image"
                        className="profile-pic"
                    />
                    {/* Edit button */}
                    <button className='profile-editbtn'>Edit</button>
                    {/* Profile Details */}
                    <div className="profile-details">
                        <h1>Jane Doe</h1>
                        <p>
                            <strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur.
                        </p>
                        <h2>Contact Information</h2>
                        <ul className="contact info">
                            <li>
                                <strong>Email:</strong> jane.doe@example.com
                            </li>
                            <li>
                                <strong>Phone:</strong> +1 (704) 123-4567
                            </li>
                            <li>
                                <strong>Location:</strong> Charlotte, NC
                            </li>
                        </ul>
                    </div>
                </div>
                <h2>Education</h2>
                <ul className="cards">
                    <button className='profile-addbtn'>+</button>
                    <div className='card-info'>
                        <button className='profile-editbtn'>Edit</button>
                        <button>Delete</button>
                        <h3>University of North Carolina at Charlotte</h3>
                        <p>
                            <strong>Degree: </strong>Bachelor of Science
                        </p>
                        <p>
                            <strong>Major: </strong>Computer Science
                        </p>
                        <p>2021 - 2024</p>
                    </div>

                </ul>
                <h2>Certifications</h2>
                <ul className="cards">
                    <button className='profile-editbtn'>Edit</button>
                    <p>Google Cloud Professional Cloud Architect</p>
                    <p>AWS Certified Solutions Architect Associate</p>
                    <p>Certified Kubernetes Administrator</p>
                </ul>
                {/* Additional Details Section */}
                <h3>Skills &amp; Interests</h3>
                <section className="cards">
                    <div className="row">
                        <div className="card-info">
                            <button className='skills-addbtn'
                                onClick={() => addTag('skills')}>+</button>
                            <h4>Skills</h4>
                            <div className='tag-container'>
                                {sections.skills.map((tag) => (
                                    <Tag key={tag.index} text={tag.text}
                                        onDelete={() => deleteTag('skills', tag.index)} />
                                ))}

                            </div>
                        </div>
                        <br />
                        <div className="card-info">
                            <button className='skills-addbtn'
                                onClick={() => addTag('interests')}>+</button>
                            <h4>Interests</h4>
                            <div className='tag-container'>
                                {sections.interests.map((tag) => (
                                    <Tag key={tag.index} text={tag.text}
                                        onDelete={() => deleteTag('interests', tag.index)} />
                                ))}

                            </div>
                        </div>
                    </div>
                </section>
                <h2>Experience</h2>
                <section className="cards">
                    <button className='profile-addbtn'>+</button>
                    <div className='card-info'>
                        <button className='profile-editbtn'>Edit</button>
                        <button>Delete</button>
                        <p>
                            <strong>Job Title: </strong>Software Engineer
                        </p>
                        <p>
                            <strong>Company: </strong> Microsoft
                        </p>
                        <p>
                            <strong>Date of Employment: </strong>October 2021 - Present
                        </p>
                    </div>

                </section>
            </main>
        </>
    );
};
