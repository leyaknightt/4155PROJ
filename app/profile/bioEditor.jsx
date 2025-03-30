'use client';
import React from "react";
import { useState, useEffect } from "react";

export default function BioEditor({ existingData, onSave }) {
    const [formData, setFormData] = useState({
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        bio: 'Aspiring software developer with a passion for learning.',
        phone: '704-123-4567',
        location:'Charlotte, NC',
    });

    // intialize form data with existing user data
    useEffect(() => {
        if (existingData) {
            setFormData({
                name: existingData.name || '',
                email: existingData.email || '',
                bio: existingData.bio || '',
                phone: existingData.phone || '',
                location: existingData.location || '',
            }
              );
        }
    }, [existingData]);

    // update the data field based on name
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    // save changes
    function handleSave(e) {
        e.preventDefault();
        onSave(formData);
    }

    return (
        <div>
            <form>
                {/* Name Input */}
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                         />
                </div>
                <br />
                {/* bio input */}
                <div>
                    <label htmlFor="bio">Bio: </label>
                    <textarea name="bio"
                        id="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself" />
                </div>
                <br />
                {/*Email */}
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email" />
                </div>
                <br />
                {/* Phone */}
                <div>
                    <label htmlFor="phone">Phone: </label>
                    <input type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your number" />
                </div>
                <br />
                {/* Location */}
                <div>
                    <label htmlFor="location">Location: </label>
                    <input type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter your location (i.e. City, State)" />
                </div>
                {/* Save Button */}
                <div>
                    <button type="button" onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
    )
}