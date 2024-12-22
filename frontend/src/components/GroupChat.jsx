
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupChat = () => {
    const [groups, setGroups] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        // Fetch user's groups on load
        const fetchGroups = async () => {
            try {
                const res = await axios.get('/api/group-chat');
                setGroups(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchGroups();
    }, []);

    const fetchMessages = async (groupId) => {
        try {
            const res = await axios.get(`/api/group-chat/${groupId}/messages`);
            setMessages(res.data);
            setCurrentGroupId(groupId);
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = async () => {
        if (!newMessage && imageFiles.length === 0) return;

        const formData = new FormData();
        formData.append('content', newMessage);
        imageFiles.forEach((file) => formData.append('images', file));

        try {
            await axios.post(`/api/group-chat/${currentGroupId}/send-message`, formData);
            fetchMessages(currentGroupId); // Refresh messages
            setNewMessage('');
            setImageFiles([]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Group Chat</h1>
            <div className="groups">
                {groups.map((group) => (
                    <button key={group._id} onClick={() => fetchMessages(group._id)}>
                        {group.name}
                    </button>
                ))}
            </div>
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg._id}>
                        <p>{msg.sender.name}: {msg.content}</p>
                        {msg.images.map((img, index) => (
                            <img key={index} src={img} alt="message attachment" />
                        ))}
                    </div>
                ))}
            </div>
            <div className="send-message">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImageFiles(Array.from(e.target.files))}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default GroupChat;
