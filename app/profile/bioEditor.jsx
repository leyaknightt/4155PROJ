'use client';
import React from "react";
import { useState, useEffect } from "react";

export default function BioEditor({ existingData, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        phone: '',
        location:'',
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
    function handleSave() {
        onSave(formData);
    }

    return (
        <div>
            <form>
                {/* Name Input */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                         />
                </div>
                {/* bio input */}
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio"
                        id="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself" />
                </div>
                {/*Email */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email" />
                </div>
                {/* Phone */}
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your number" />
                </div>
                {/* Location */}
                <div>
                    <label htmlFor="location">Location</label>
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