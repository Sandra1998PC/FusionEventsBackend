const notif = require('../Model/notificationsModel')

exports.viewUserNotifController = async (req, res) => {
    const { id } = req.params;
    try {
        const viewNotif = await notif.find({ userId : id });
        res.status(200).json(viewNotif);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.viewOrganizerNotifController = async (req, res) => {
    const { id } = req.params;
    try {
        const viewNotif = await notif.find({ organizerId : id });
        res.status(200).json(viewNotif);
    } catch (error) {
        console.error('Error fetching Organizer notifications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};