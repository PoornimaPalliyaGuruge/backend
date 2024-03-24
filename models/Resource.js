    const { Schema, model } = require('mongoose');

    const ResourceSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
    
    });

    module.exports = model('Resource', ResourceSchema);
