const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow corss-origin requests
app.use(cors());

//connect to mongoDB
mongoose.connect('mongodb+srv://mario:Behemoth13@cluster0-o2mmz.mongodb.net/gql-ninja?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('Listening for requests on port 5000');
}); 