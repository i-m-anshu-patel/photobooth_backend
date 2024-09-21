const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/photobooth";

const connectToMongo = () => {
    mongoose.connect(mongoURI).then( () => console.log('Connected Successfully'))
    .catch((err) => {console.log(err);})
}

module.exports = connectToMongo;