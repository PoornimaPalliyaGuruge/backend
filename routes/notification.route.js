    const exp = require("express");
    const router = require( "express" ).Router();
    const { triggerNotifications} =  require('../controllers/notification.controller.js');
    const { userAuth, checkRole } = require('../controllers/Auth.js');

    router.post('/trigger', async (req, res) => {
        try {
            const { affectedUsers, message } = req.body;
            await triggerNotifications(affectedUsers, message);
            res.status(200).json({ message: 'Notifications triggered successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    module.exports =  router;