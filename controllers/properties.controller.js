const Property = require('../models/properties.model');
const { v4: uuidv4 } = require('uuid');

const createProperty = (req, res, next) => {

    const propertyId = uuidv4();

    let newProperty = new Property({
        propertyId: propertyId,
        ownerName: req.body.ownerName,
        address: req.body.address,
        mobileNo: req.body.mobileNo,
        ownerEmail: req.body.ownerEmail,
        pinCode: req.body.pinCode,
        city: req.body.city
    });

    Property.findOne({$or: [{ ownerEmail: req.body.ownerEmail }, { mobileNo: req.body.mobileNo }]})
        .then(property => {
            if (!property) {
                newProperty.save()
                    .then(result=> {
                        res.status(201).json({message: 'Property created successfully'});
                    })
                    .catch(err => {
                        if (err.name === 'ValidationError') {
                            res.status(400).json({ message: 'Bad Request' });
                        }
                        else {
                            res.status(500).json({ message: 'An error occurred while registering new user' });
                        }
                    })
            }
            else {
                res.status(400).json({ message: 'Property already exists' });
            }
        }).catch(err=> {
            res.status(500).json({message: 'Internal server error'});
        })
}

const getProperty = (req, res, next) => {
    Property.findOne({ propertyId: req.query.id },'-auditTrail')
        .then(result => {
            if (result && result.status!='DELETED') {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({message:'Not found'});
            }
        })
        .catch(err=> {
            res.status(500).json({message: 'Internal server error'});
        })
}

const deleteProperty = (req, res, next) => {
    const update = { status: 'DELETED' };

    Property.findOneAndUpdate({propertyId: req.query.id}, update)
        .then(result=> {
            if (result) {
                res.status(204).json({message: 'Deleted successfully'});
            }
            else {
                res.status(404).json({message: 'Property not found'});
            }
        })
        .catch(err=> {
            console.log('Error occurred while deleting property: '+err);
            res.status(500).json({message:'Internal server error'});
        })
}

const updateProperty = (req, res, next) => {
    // not allowing to update owner email/mobile no
    const updatedPropertyDetails = {
        ownerName: req.body.ownerName,
        address: req.body.address,
        pinCode: req.body.pinCode,
        city: req.body.city,
        ownerEmail: req.body.email
     };

    Property.findOneAndUpdate({propertyId: req.body.id}, updatedPropertyDetails)
        .then(result => {
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({message: 'Property not found'});
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).json({ message: 'Bad Request' });
            }
            else {
                res.status(500).json({ message: 'An error occurred while updating property details' });
            }
        })
}

module.exports = {
    createProperty, getProperty, deleteProperty, updateProperty
};