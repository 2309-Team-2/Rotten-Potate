import React, { useState } from 'react';

const Profile = ({ user, onUpdateProfile }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState(user.name);
    const [editedEmail, setEditedEmail] = useState(user.email);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        // Assuming some validation before saving
        if (editedName.trim() !== '' && editedEmail.trim() !== '') {
            onUpdateProfile({
                id: user.id,
                name: editedName,
                email: editedEmail,
            });
            setEditMode(false);
        }
    };

    const handleCancelClick = () => {
        setEditMode(false);
        // Reset edited values to the current user's data
        setEditedName(user.name);
        setEditedEmail(user.email);
    };

    return (
        <div>
            <h2>Your Profile</h2>
            {editMode ? (
                <div>
                    <label>Name:</label>
                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    <br />
                    <label>Email:</label>
                    <input type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                    <br />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <button onClick={handleEditClick}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;