const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        },
        thoughts:[{type: Schema.Types.ObjectId, ref:'thought'}],
        friends:[{type: Schema.Types.ObjectId, ref:'user'}]
    }
)

userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;