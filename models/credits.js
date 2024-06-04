const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    L: {
        type: Number,
        required: true
    },
    T: {
        type: Number,
        default: 0
    },
    P: {
        type: Number,
        default: 0
    },
    IA: {
        type: Number,
        // required: true
    },
    ETE: {
        type: Number,
        // required: true
    },
    Total: {
        type: Number
    }
});

const courseSchema = new mongoose.Schema({
    Course_Title: {
        type: String,
        // required: true
    },
    credits: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    Credits: {
        type: Number,
        // required: true
    }
});

const courseModel = mongoose.model('Credits', courseSchema);

module.exports = courseModel;
