const {Schema, model} = require('mongoose');

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
            default: Date.now
        },
        username:{
            type:String,
            required: true
        },
        reactions:[{type: Schema.Types.ObjectId, ref:"reactionSchema"}]
    }
)

thoughtSchema.virtual('reactionCount').get(() =>{
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;