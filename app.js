const express = require('express');
const connectToMongo = require('./db');
const app = express();
const authRoutes = require('./routes/authRoutes'); 
const bodyParser = require('body-parser');
const cors = require('cors');
connectToMongo();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth' , authRoutes);

app.listen(5000, () => {
    console.log("App listening at port 5000");
})