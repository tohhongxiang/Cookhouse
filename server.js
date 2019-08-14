const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dayMenuRoutes = require('./routes/menuroutes');
require('dotenv').config();

const app = express();

// MIDDLEWARE
app.use(express.json()); 
app.use(cors());
app.use('/Cookhouse/', express.static(path.join(__dirname, "client", "build"))); // serving static files from the ./client/build 
// when building client, it is assumed that the client is hosted at /Cookhouse. So we serve from there

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}) // CONNECT TO MONGODB
.then(()=> {
    console.log("Successfully connected to MONGODB"); // IF SUCCESSFUL CONNECTION
}).catch(err => {
    console.log(err); // IF ERROR ARISES
});

const PORT = process.env.PORT || 5000;

app.use('/api', dayMenuRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}); // if any request doesnt correspond to the /api request, serve the index.html file

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})