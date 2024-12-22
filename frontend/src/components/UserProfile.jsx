
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    const [blockStatus, setBlockStatus] = useState(false);

    useEffect(() => {
        // Fetch user's profile on load
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/api/user-profile/${userId}`);
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [userId]);

    const blockUser = async () => {
        try {
            await axios.post(`/api/user-profile/${userId}/block`, { blockerId: /* Current User ID */ });
            setBlockStatus(true);
        } catch (err) {
            console.error(err);
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>{profile.name}</h1>
            <p>{profile.profileInfo?.bio}</p>
            <img src={profile.profileInfo?.profilePicture} alt="Profile" />
            <button onClick={blockUser} disabled={blockStatus}>
                {blockStatus ? 'User Blocked' : 'Block User'}
            </button>
        </div>
    );
};

export default UserProfile;
