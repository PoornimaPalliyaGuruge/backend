    const Notification = require('../models/Notification');


    const triggerNotifications = async (affectedUsers, message) => {
        try {
        
            const notifications = affectedUsers.map(user => ({
                recipient: user,
                message: message
            }));

            await Notification.insertMany(notifications);
            console.log('Notifications triggered successfully.');
        } catch (error) {
            console.error('Error triggering notifications:', error);
        }
    };

    module.exports = { 
        triggerNotifications 
    };
