const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dayMenuRoutes = require('./routes/menuroutes');
require('dotenv').config();

const app = express();

// MIDDLEWARE
app.use(express.json()); 
app.use(cors());

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true}) // CONNECT TO MONGODB
.then(()=> {
    console.log("Successfully connected to MONGODB"); // IF SUCCESSFUL CONNECTION
}).catch(err => {
    console.log(err); // IF ERROR ARISES
});

const PORT = process.env.PORT || 5000;

app.use('/api', dayMenuRoutes);

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})