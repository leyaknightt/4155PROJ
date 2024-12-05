"use client";
import React, { useState} from 'react';
import '../profile/profile.css';
import Tag from './tag';
import Image from 'next/image';
import BioEditor from './bioEditor';
import EducationSection from './educationSection';
import Certifications from './certifsSection';
import ExperienceSection from './experienceSection';
import Link from 'next/link';


export default function Profile() {
    // Create state to store different tags
    const [skillTags, setSkills] = useState([]);
    const [interestTags, setInterests] = useState([]);
    const [inputValue, setInput] = useState("");
    const [tagType, setType] = useState('skill');
    const handleInputChange = (event) => { setInput(event.target.value); }
    // simulate existing user data (info from db would go here)
    const existingUserData = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        bio: 'Aspiring software developer with a passion for learning.',
        phone: '704-123-4567',
        location: 'Charlotte, NC',
    };
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(existingUserData);

    //////// Function to handle tags////////
    //function to delete tag based on type
    function deleteTag(targetTag, tagType) {
        if (tagType == 'skill') {
            setSkills(skillTags.filter((tag) => tag !== targetTag));
        }
        if (tagType == 'interest') {
            setInterests(interestTags.filter((tag) => tag !== targetTag));
        }
    };

    // function to add new tags
    function addTag() {
        const newTagContent = inputValue.trim();
        // for skill tags
        if (tagType == 'skill' && !skillTags.includes(newTagContent)) {
            setSkills((prevTags) => [...prevTags, newTagContent]);
        }

        // for interest tags
        if (tagType == 'interest' && !interestTags.includes(newTagContent)) {
            setInterests((prevTags) => [...prevTags, newTagContent]);
        }

        setInput(''); // clears the input field
    };

    //// functions for bio////
    function handleEdit() {
        setIsEditing(true); // Toggle edit mode
    }

    function handleBioSave(updatedData) {
        setProfileData(updatedData);
        setIsEditing(false);
    }

    return (
        <>
         <main className="profile">
        {/* Navbar */}
      <nav className="navbar">
        <div className="logo">LAKA</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/post">Post a Job</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="profile-icon">
        <Link href="/profile">
            <img src="/path-to-profile-icon.png" alt="Profile" style={{ cursor: 'pointer' }} />
          </Link>
        </div>
      </nav>
            <h1>Profile</h1>
           
                {isEditing ? (
                    <BioEditor existingUserData={profileData} onSave={handleBioSave} />
                ) : (
                    <div className="personal-info">
                        <div className='pic-and-name'>
                            {/* Profile Image */}
                            <Image
                                src='/alice.jpg'
                                alt="Profile Image"
                                className="profile-pic"
                                width={100}
                                height={100}
                            />
                            <h1>{profileData.name}</h1>
                            {/* Edit button */}
                            <button className='profile-editbtn' onClick={handleEdit}>Edit</button>
                        </div>
                        {/* Profile Details */}
                        <div className="profile-details">
                            <p>
                                <strong>Bio:</strong> {profileData.bio}
                            </p>
                            <h2>Contact Information</h2>
                            <ul className="contact info">
                                <li>
                                    <strong>Email:</strong> {profileData.email}
                                </li>
                                <li>
                                    <strong>Phone:</strong> {profileData.phone}
                                </li>
                                <li>
                                    <strong>Location:</strong> {profileData.location}
                                </li>
                            </ul>
                        </div>
                    </div>)}
            <h2>Education</h2>
                <ul className="cards">
                    <EducationSection />
                </ul>
            <h2>Certifications</h2>
                <Certifications />
                
                {/* Additional Details Section */}
                <h2>Skills &amp; Interests</h2>
                <section className="cards">
                    <div className="row">
                        <div className='tagSelection'>
                            <button className='tagType' onClick={() => setType('skill')}>Skill Tags</button>
                            <button className='tagType' onClick={() => setType('interest')}>Interest Tags</button>
                        </div>
                        <br />
                        <div>
                            <input className='tag-input'
                                type='text'
                                name='tag'
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder='Add tag here' />
                            <button className='skills-addbtn'
                                onClick={() => addTag()}>+</button>
                        </div>
                        <br />
                        {/* Skills Section */}
                        <div className="card-info">
                            <h4>Skills</h4>
                            <div className='tag-container'>
                                {skillTags.map((tag, index) => (
                                    <Tag key={index} text={tag}
                                        onDelete={() => deleteTag(tag, 'skill')} />
                                ))}
                            </div>
                        </div>
                        {/* Interests section */}
                        <br />
                        <div className="card-info">
                            <h4>Interests</h4>
                            <div className='tag-container'>
                                {interestTags.map((tag, index) => (
                                    <Tag key={index} text={tag}
                                        onDelete={() => deleteTag(tag, 'interest')} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            <h2>Experience</h2>
                <section className="cards">
                    <ExperienceSection />
                </section>
            </main>
        </>
    );
};
