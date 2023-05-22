const mongoose = require('mongoose');

// Set the 'strictQuery' option to 'false' explicitly
mongoose.set('strictQuery', false);



//  Connecting to MongoDB
const dbConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/airbnbClone', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Connected to MongoDB');
            // Continue with your application logic
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = dbConnection