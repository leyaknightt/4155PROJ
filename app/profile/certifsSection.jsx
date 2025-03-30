"use client";
import { useState, useEffect } from "react";
import React from "react";
import Tag from "./tag";
import '../profile/profile.css';

export default function Certifications() {
    //state to store list of certifications
    const [certifications, setCertifications] = useState([]);
    const [inputValue, setInput] = useState('');

    const dummyData = [
        {
            id: 1,
            text: 'Google Cloud Professional Cloud Architect',
        },
        {
            id: 2,
            text: 'AWS Certified Solutions Architect Associate',
        },
    ];

    useEffect(() => {
        setCertifications(dummyData);
    }, []);

    const handleInputChange = (event) => { setInput(event.target.value); }

    // function to add new certifs
    function addCertification() {
        const newCert = {
            id: Date.now,
            text: inputValue,
        };
        if (!certifications.includes(newCert)) {
            setCertifications((prev) => [...prev, newCert]);
        }
        setInput(''); // clears the input field
    };

    //function to delete tag
    function deleteCertification(targetCert) {
        setCertifications(certifications.filter((cert) => cert.id !== targetCert));

    };

    return (
        <div className="cards">
            <div>
                <input className='tag-input'
                    type='text'
                    name='tag'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Add certification here' />
                <button className='skills-addbtn'
                    onClick={() => addCertification()}>+</button>
            </div>
            <div className='certs-container'>
                {certifications.map((certification) => (
                    <Tag key={certification.id} text={certification.text}
                        onDelete={() => deleteCertification(certification.id)} />
                ))}
            </div>
        </div>

    );
}