const {Schema, Types} = require('mongoose');

reactionSchema = new Schema(
    {
        reactionBody:{
            type: String,
            required: true,
            maxLength: 280
        },
        username:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: (date) => {
                return date.toLocalDateString("en-US");
            }
        },
    }
)

module.exports = reactionSchema;