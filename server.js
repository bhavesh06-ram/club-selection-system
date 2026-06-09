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


// FORM PAGE

app.get("/", (req, res) => {

    res.send(`

    <!DOCTYPE html>
    <html>

    <head>

        <title>Club Coordinator Form</title>

        <style>

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family: Arial, sans-serif;
            }

            body{
                background: linear-gradient(135deg,#4facfe,#00f2fe);
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
            }

            .container{
                width:400px;
                background:white;
                padding:30px;
                border-radius:15px;
                box-shadow:0 10px 25px rgba(0,0,0,0.2);
            }

            h1{
                text-align:center;
                margin-bottom:25px;
                color:#333;
            }

            input, textarea{
                width:100%;
                padding:12px;
                margin-bottom:15px;
                border:1px solid #ccc;
                border-radius:8px;
                outline:none;
                font-size:15px;
            }

            textarea{
                resize:none;
                height:100px;
            }

            input:focus,
            textarea:focus{
                border-color:#4facfe;
                box-shadow:0 0 5px rgba(79,172,254,0.5);
            }

            button{
                width:100%;
                padding:12px;
                border:none;
                border-radius:8px;
                background:#4facfe;
                color:white;
                font-size:16px;
                cursor:pointer;
                transition:0.3s;
            }

            button:hover{
                background:#007bff;
            }

        </style>

    </head>

    <body>

        <div class="container">

            <h1>Club Coordinator Form</h1>

            <form action="/submit" method="POST">

                <input type="text" name="name" placeholder="Enter Name" required />

                <input type="email" name="email" placeholder="Enter Email" required />

                <input type="text" name="branch" placeholder="Enter Branch" required />

                <input type="text" name="year" placeholder="Enter Year" required />

                <input type="text" name="skills" placeholder="Enter Skills" required />

                <textarea name="reason" placeholder="Why do you want to join?" required></textarea>

                <button type="submit">Submit Application</button>

            </form>

        </div>

    </body>

    </html>

    `);

});



// SAVE DATA

app.post("/submit", async (req, res) => {

    await Student.create(req.body);

    res.send(`

    <html>

    <head>

        <style>

            body{
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                background:linear-gradient(135deg,#43e97b,#38f9d7);
                font-family:Arial;
            }

            .box{
                background:white;
                padding:40px;
                border-radius:15px;
                text-align:center;
                box-shadow:0 10px 25px rgba(0,0,0,0.2);
            }

            h1{
                color:#28a745;
                margin-bottom:15px;
            }

            a{
                text-decoration:none;
                color:white;
                background:#28a745;
                padding:10px 20px;
                border-radius:8px;
            }

        </style>

    </head>

    <body>

        <div class="box">

            <h1>Application Submitted ✅</h1>

            <br>

            <a href="/">Go Back</a>

        </div>

    </body>

    </html>

    `);

});




// ADMIN PAGE

app.get("/admin", async (req, res) => {

    const students = await Student.find();

    let output = `

    <!DOCTYPE html>
    <html>

    <head>

        <title>Admin Panel</title>

        <style>

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:Arial;
            }

            body{
                background:#f4f4f4;
                padding:40px;
            }

            h1{
                text-align:center;
                margin-bottom:30px;
                color:#333;
            }

            .card{
                background:white;
                padding:20px;
                margin-bottom:20px;
                border-radius:12px;
                box-shadow:0 5px 15px rgba(0,0,0,0.1);
                transition:0.3s;
            }

            .card:hover{
                transform:translateY(-5px);
            }

            h2{
                color:#007bff;
                margin-bottom:10px;
            }

            p{
                margin:8px 0;
                color:#555;
            }

            .label{
                font-weight:bold;
                color:#222;
            }

        </style>

    </head>

    <body>

        <h1>All Student Applications</h1>

    `;


    students.forEach(student => {

        output += `

        <div class="card">

            <h2>${student.name}</h2>

            <p><span class="label">Email:</span> ${student.email}</p>

            <p><span class="label">Branch:</span> ${student.branch}</p>

            <p><span class="label">Year:</span> ${student.year}</p>

            <p><span class="label">Skills:</span> ${student.skills}</p>

            <p><span class="label">Reason:</span> ${student.reason}</p>

        </div>

        `;
    });

    output += `
        </body>
        </html>
    `;

    res.send(output);

});




// START SERVER

app.listen(3000, () => {

    console.log("Server Running on Port 3000");

});


