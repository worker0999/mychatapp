
const User = require('../models/User');

exports.viewProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.blockUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { blockedUserId } = req.body;
        const user = await User.findById(userId);
        user.blockedUsers.push(blockedUserId);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
