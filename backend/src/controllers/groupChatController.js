
const GroupChat = require('../models/ChatGroup');
const Message = require('../models/Message');

exports.createGroup = async (req, res) => {
    try {
        const group = new GroupChat(req.body);
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const group = await GroupChat.findById(groupId);
        group.users.push(userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { groupId } = req.params;
        const message = new Message({ ...req.body, group: groupId });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        const messages = await Message.find({ group: groupId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
