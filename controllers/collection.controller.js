const Collection = require('../models/collection.model');
const isNotToday = require('../helpers/date-helper');

const createCollection = (req, res, next) => {

    // create new collection/document if it doesn't exist or if it exists then update the audit trail
    Collection.findOne({ email: req.body.email })
        .then(result => {
            // if it doesn't exist, then create a fresh new document
            if (!result) {
                let newCollection = new Collection({
                    email: req.body.email,
                    auditTrail: [{
                        propertyId: req.body.propertyId,
                        lat: req.body.lat,
                        long: req.body.long,
                        date: new Date()
                    }]
                });
                newCollection.save()
                    .then(result => {
                        res.status(200).json({ message: 'Created successfully' });
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
            // document exists, just create/push a new audit trail
            else {
                // if the incoming property id is already scanned today, then don't allow update
                var insert = true;
                result.auditTrail.forEach(element => {
                    if (req.body.propertyId && element.propertyId === req.body.propertyId && isNotToday(element.date)) {
                        insert = false;
                    }
                })
                if (insert) {
                    let document = result;
                    let newAuditLog = {
                        "propertyId": req.body.propertyId,
                        "lat": req.body.lat,
                        "long": req.body.long,
                        "date": new Date()
                    };
                    document.auditTrail.push(newAuditLog);
                    document.save()
                        .then(result => {
                            res.status(201).json({ message: 'Updated successfully' });
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
                    res.status(400).json({ message: 'Already scanned' });
                }

            }
        })
        .catch(err => {
            console.log('Some error occurred '+err);
            res.status(500).json({ message: 'An error occurred while updating collection details' });
        })
};

module.exports = {
    createCollection
};