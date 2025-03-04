//adding express to my app
//express.js handles server-side logic 
//allows the app to process api requests like CRUD (create, read, update & delete)
const express = require('express');
const app = express();
const port = 4000;

//adding cors to the app
const cors = require('cors');
app.use(cors());

//allows the front-end side of the app to make api requets to the backend without encounterung cors issues
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//body-parser middleware is used to parse incoming requests so that the server can access data sent by the client 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send("running on port 4000");
});

 //connecting mongoose to server.js
 const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://g00419319:admin@project-2024.owuzo.mongodb.net/DBproject')
 .then(() => console.log("MongoDB connected successfully"))
 .catch(err => console.error("MongoDB connection error:", err));

 //model
 const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
 }, { collection: "emails" });

 const emailModel = mongoose.model("emailModel",emailSchema);

 //checking if email exists for login
  app.post("/AccountLogin", async (req, res) => {
    
        const { email } = req.body;
        console.log("Checking email:", email);

        //Validate input
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        //looking for email
        //puts all letters to lower case
        const foundEmail = await emailModel.findOne({ email: email.trim().toLowerCase() }).lean();

        if (foundEmail) {
            console.log("email exists:", foundEmail.email);
            res.json({ exists: true });
        } else {
            console.log("email not found");
            res.json({ exists: false });
        }
});

//Register a New User
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = new user({ email, password });
        await newUser.save();
        res.json({ success: true, message: "User registered" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Error registering user" });
    }
});

//error handling to catch server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//port listening on port 4000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});