const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: true }));

// MongoDB Connection

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    branch: String,
    year: String,
    skills: String,
    reason: String
});

// Model

const Student = mongoose.model("Student", studentSchema);

// Form Page

app.get("/", (req, res) => {

    res.send(`
        
        <h1>Club Coordinator Form</h1>

        <form action="/submit" method="POST">

            <input type="text" name="name" placeholder="Name" /><br><br>

            <input type="email" name="email" placeholder="Email" /><br><br>

            <input type="text" name="branch" placeholder="Branch" /><br><br>

            <input type="text" name="year" placeholder="Year" /><br><br>

            <input type="text" name="skills" placeholder="Skills" /><br><br>

            <textarea name="reason" placeholder="Why join?"></textarea><br><br>

            <button type="submit">Submit</button>

        </form>

    `);

});

// Save Form Data

app.post("/submit", async (req, res) => {

    await Student.create(req.body);

    res.send("Form Submitted Successfully");

});

// Admin Page

app.get("/admin", async (req, res) => {

    const students = await Student.find();

    let output = "<h1>All Applications</h1>";

    students.forEach(student => {

        output += `
            <hr>
            <h3>${student.name}</h3>
            <p>${student.email}</p>
            <p>${student.branch}</p>
            <p>${student.skills}</p>
            <p>${student.reason}</p>
        `;
    });

    res.send(output);

});

// Start Server

app.listen(3000, () => {

    console.log("Server Running on Port 3000");

});