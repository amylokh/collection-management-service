const Collection = require('../models/collection.model');
const isToday = require('../helpers/date-helper');

const createCollection = (req, res, next) => {

    // create new collection/document if it doesn't exist or if it exists then update the audit trail
    Collection.findOne({ propertyId: req.body.propertyId })
        .then(result => {
            // if it doesn't exist, then create a fresh new document
            if (!result) {
                let newCollection = new Collection({
                    propertyId: req.body.propertyId,
                    auditTrail: [{
                        email: req.body.email,
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
                var auditLogs = result.auditTrail;

                if (!isToday(auditLogs[auditLogs.length - 1].date)) {
                    let document = result;
                    let newAuditLog = {
                        "email": req.body.email,
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

const getAllCollections = (req, res, next) => {
    Collection.find({})
        .then(result=> {
            res.status(200).json(result);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({message: 'Interval server error'});
        });
}

module.exports = {
    createCollection, getAllCollections
};