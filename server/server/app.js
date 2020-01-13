const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://WebPavel:Dima0914@cluster0-c0mwd.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useMongooseClient: true,
});

//DB Connection
const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log('---Connection Error', err));
dbConnection.once('open', () => console.log('---DB connected!'));

app.use('/graphql', graphQLHTTP({
    schema,
    graphiql: true,
}));

app.listen(PORT, (error) => {
    error
        ? console.error('Error', error)
        : console.log('---Server started!');
});
