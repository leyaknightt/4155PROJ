import React from "react";
import '../profile/profile.css';

export default function Tag({text, onDelete}){
    return (
        /* function used to create a tag */
        <div className="tag">
            <span style={{marginRight: '10px'}}>{text}</span>
            <button className="delete-btn"
            onClick={onDelete}>
                X
            </button>
        </div>
    );
};