# Collection-Management-Service 🗑️

Service used to manage daily user collection -

1. Create a new collection data
Path: `/collection/create`

## Install Dependencies

```npm install```

## Pre-requisites

1. Connect to a local mongo DB on PORT : ``27017`` 
2. Or I have also integrated an atlas mongo DB with this application. Contact me & I will give you the access to that DB.

# Running the application

``npm start``

# Sample request bodies

1. Create new collection data

   Pass Authorization header to get access to the resource

     POST http://localhost:9090/collection/create
        
        {
        
        "email": "amylokh@gmail.com",
        "propertyId": "142413122",
        "lat": "41",
        "long": "42",
        "refreshToken": "provided refresh token"
        
        }
