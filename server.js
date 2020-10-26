const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const CollectionRoute = require('./routes/collection.routes');
const PropertiesRoute = require('./routes/properties.routes');

const atlasMongoDbConnectionString = 'mongodb+srv://'+ process.env['USERNAME'] +':'+ process.env['PASSWORD'] + '@users.m73nf.mongodb.net/users?retryWrites=true&w=majority';
const localDbConnectionString = 'mongodb://localhost:27017/users-data';

mongoose.connect(atlasMongoDbConnectionString, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
const db = mongoose.connection;

db.on('error', (err)=> {
    console.log('Error connecting to DB', err);
});

db.once('open', ()=> {
    console.log('Database connected successfully');
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

app.use('/collection', CollectionRoute);
app.use('/properties', PropertiesRoute);