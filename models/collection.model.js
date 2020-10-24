const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const auditTrailModel = new Schema({
    email : {
        type: String,
        required: true,
        match: [emailRegex, 'email format is invalid']
    },
    date : {
        type: Date,
        required: true
    },
    lat: {
        type: String,
        required: true,
    },
    long: {
        type: String,
        required: true,
    }
},{ _id : false });

const collectionModel = new Schema({
    propertyId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    auditTrail: {
        type : [ auditTrailModel ],
        required : true
    }
},
    {
        timestamps: true,
        collection: 'collectionDetails'
    });

const CollectionConfig = mongoose.model('CollectionDetails', collectionModel);
module.exports = CollectionConfig;