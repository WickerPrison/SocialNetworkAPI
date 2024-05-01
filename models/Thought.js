const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: (date) => {
                return date.toLocalDateString("en-US");
            }
        },
        username:{
            type:String,
            required: true
        },
        reactions:[Reaction]
    }
)

thoughtSchema.virtual('reactionCount').get(() =>{
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;