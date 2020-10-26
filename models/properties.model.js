const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//This model is similar to the collection model with a few differences

const propertyModel = new Schema({
    propertyId: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    ownerName: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    mobileNo: {
        type: String,
        immutable: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['EXISTS', 'DELETED'],
        default: 'EXISTS'
    },
    ownerEmail: {
        type: String,
        lowercase: true,
        match: [emailRegex, 'Invalid email format'],
        immutable: true,
        trim: true
    },
    pinCode: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true,
        collection: 'collectionDetails'
    });

const PropertyConfig = mongoose.model('PropertyDetails', propertyModel);
module.exports = PropertyConfig;