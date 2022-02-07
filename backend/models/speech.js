import mongoose from 'mongoose'

const speechSchema = mongoose.Schema({
    //title: String,
    name: {
        type: String, // user's name
        required: true,
    },
    creator: {
        type: String, // user's ID
        required: true,
    },
    shared: {
        type: Boolean,
        default: false,
    },
    speech: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Speech = mongoose.model('Speech', speechSchema)

export default Speech;
