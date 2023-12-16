// Setup
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/public/home.html");
});

app.listen(3000, function() {
    console.log("Server is runing on port 3000");
}); 

// Connect to Database
mongoose.connect("mongodb+srv://VitalityTech:Vitality_Tech@vsquarescluster0.5m9f2hg.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;

// Event listeners for connection status
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('connected', () => {
    console.log('Connected to MongoDB database');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB database');
});

// Create Schema
const submissionSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    month: String, 
    year: String,
    checkbox1: {
        type: Boolean,
        default: false},
    checkbox2: {
        type: Boolean,
        default: false},
    checkbox3: {
        type: Boolean,
        default: false},
    checkbox4: {
        type: Boolean,
        default: false},
    checkbox5: {
        type: Boolean,
        default: false},
    checkbox6: {
        type: Boolean,
        default: false},
    checkbox7: {
        type: Boolean,
        default: false},
    checkbox8: {
        type: Boolean,
        default: false},
    checkbox9: {
        type: Boolean,
        default: false},
    checkbox10: {
        type: Boolean,
        default: false},
    checkbox11: {
        type: Boolean,
        default: false},
    checkbox12: {
        type: Boolean,
        default: false},
    checkbox13: {
        type: Boolean,
        default: false},
    checkbox14: {
        type: Boolean,
        default: false},
    checkbox15: {
        type: Boolean,
        default: false}
});

// Create Model for individual submissions
const submissionModel = mongoose.model("individualSubmission", submissionSchema);

// Create Schema for data displayed on home page
const displaySchema = new mongoose.Schema({
    checkbox1: Number,
    checkbox2: Number,
    checkbox3: Number,
    checkbox4: Number,
    checkbox5: Number,
    checkbox6: Number,
    checkbox7: Number,
    checkbox8: Number,
    checkbox9: Number,
    checkbox10: Number,
    checkbox11: Number,
    checkbox12: Number,
    checkbox13: Number,
    checkbox14: Number,
    checkbox15: Number
});

// Create Model for combine data
const displayModel = mongoose.model("displayDataCollection", displaySchema);

// Add input from form to DB
app.post("/insert", function(req,res){
    let newResult = new submissionModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email, 
        month: req.body.month,
        year: req.body.year,
        checkbox1: req.body.checkbox1,
        checkbox2: req.body.checkbox2,
        checkbox3: req.body.checkbox3,
        checkbox4: req.body.checkbox4,
        checkbox5: req.body.checkbox5,
        checkbox6: req.body.checkbox6,
        checkbox7: req.body.checkbox7,
        checkbox8: req.body.checkbox8,
        checkbox9: req.body.checkbox9,
        checkbox10: req.body.checkbox10,
        checkbox11: req.body.checkbox11,
        checkbox12: req.body.checkbox12,
        checkbox13: req.body.checkbox13,
        checkbox14: req.body.checkbox14,
        checkbox15: req.body.checkbox15
    });

    newResult.save()
        .then(savedResult => {
            console.log("Saved new entry:", savedResult);
            updateDisplayDataCollection();
        })
        .catch(error => {
            console.error("Error saving new entry:", error);
        });

    res.redirect("/");
});

// Function to update the DisplayDataCollection 
function updateDisplayDataCollection() {
    submissionModel.aggregate([
        {
            $group: {
                _id: null,
                checkbox1: { $sum: { $cond: [{ $eq: ["$checkbox1", true] }, 1, 0] } },
                checkbox2: { $sum: { $cond: [{ $eq: ["$checkbox2", true] }, 1, 0] } },
                checkbox3: { $sum: { $cond: [{ $eq: ["$checkbox3", true] }, 1, 0] } },
                checkbox4: { $sum: { $cond: [{ $eq: ["$checkbox4", true] }, 1, 0] } },
                checkbox5: { $sum: { $cond: [{ $eq: ["$checkbox5", true] }, 1, 0] } },
                checkbox6: { $sum: { $cond: [{ $eq: ["$checkbox6", true] }, 1, 0] } },
                checkbox7: { $sum: { $cond: [{ $eq: ["$checkbox7", true] }, 1, 0] } },
                checkbox8: { $sum: { $cond: [{ $eq: ["$checkbox8", true] }, 1, 0] } },
                checkbox9: { $sum: { $cond: [{ $eq: ["$checkbox9", true] }, 1, 0] } },
                checkbox10: { $sum: { $cond: [{ $eq: ["$checkbox10", true] }, 1, 0] } },
                checkbox11: { $sum: { $cond: [{ $eq: ["$checkbox11", true] }, 1, 0] } },
                checkbox12: { $sum: { $cond: [{ $eq: ["$checkbox12", true] }, 1, 0] } },
                checkbox13: { $sum: { $cond: [{ $eq: ["$checkbox13", true] }, 1, 0] } },
                checkbox14: { $sum: { $cond: [{ $eq: ["$checkbox14", true] }, 1, 0] } },
                checkbox15: { $sum: { $cond: [{ $eq: ["$checkbox15", true] }, 1, 0] } }
            }
        }
    ])
    .then(results => {
        if (results.length > 0) {
            const dataToUpdate = {
                checkbox1: results[0].checkbox1,
                checkbox2: results[0].checkbox2,
                checkbox3: results[0].checkbox3,
                checkbox4: results[0].checkbox4,
                checkbox5: results[0].checkbox5,
                checkbox6: results[0].checkbox6,
                checkbox7: results[0].checkbox7,
                checkbox8: results[0].checkbox8,
                checkbox9: results[0].checkbox9,
                checkbox10: results[0].checkbox10,
                checkbox11: results[0].checkbox11,
                checkbox12: results[0].checkbox12,
                checkbox13: results[0].checkbox13,
                checkbox14: results[0].checkbox14,
                checkbox15: results[0].checkbox15
            };

            // Find and update the displayDataCollection
            displayModel.findOneAndUpdate({}, dataToUpdate, { upsert: true })
                .then(updatedData => {
                    console.log("Updated displayDataCollection:", updatedData);
                })
                .catch(error => {
                    console.error("Error updating displayDataCollection:", error);
                });
        }
    })
    .catch(error => {
        console.error("Error while aggregating data:", error);
    });
}