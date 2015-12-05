// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Define a new 'WorkOrderSchema'
var WorkOrderSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    firstname: String,
    lastname: String,
    Building: {
        type: String,
        default: '',
        trim: true,
        required: 'Building cannot be blank'
    },
    AptNumber: {
        type: String,
        default: '',
        trim: true,
        required: 'Apartment Number cannot be blank'
    },
    ProblemDescription: {
        type: String,
        default: '',
        trim: true,
        required: 'Problem description cannot be blank'
    },
    PhoneNumber: {
        type: String,
        default: '',
        trim: true,
        required: 'Phone Number cannot be blank'
    },
    completed: {
        type: String,
        default: '',
        trim: true,
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});

// Create the 'Workorder' model out of the 'WorkOrderSchema'
mongoose.model('WorkOrder', WorkOrderSchema);