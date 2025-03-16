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

 //schema for user registering 
 const userRegSchema = new mongoose.Schema({
    fname: String,// first name
    sname: String, //surname
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },// convert email to lowercase
    password: String,
    phoneNum: String,
    dob: Date //date of birth

 });

const userReg = mongoose.model('userReg', userRegSchema);

 //checking if email exists for login
 //then if email exists ask for password 
 //if email does not exist send them to the register page
app.post("/AccountLogin", async (req, res) => {
    
        const { email, password } = req.body;
        console.log("Checking email:", email);

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // trim email and make it lowercase
        const convertEmail = email.trim().toLowerCase();

        // Find user email in database
        const foundEmail = await userReg.findOne({ email: convertEmail }).lean();

        if (!foundEmail) {
            console.log("Email not found");
            return res.json({ exists: false, message: "Email not found , Register"});
        }

        console.log("Email exists:", foundEmail.email);

        //ensure password is provided
        if (!password) {
            return res.json({ exists: true, message: "Enter password" });
        }

        //Check if password is correct or not
        if (foundEmail.password === password) {
            console.log("Password is correct");
            return res.json({ success: true });
        } else {
            console.log("Incorrect password");
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
});


//Register a New User
app.post("/register", async (req, res) => {

    const { fname, sname, email, password, phoneNum, dob } = req.body;

        // trim email and make it lowercase
        const convertEmail = email.trim().toLowerCase();

      // Check if email already exists
      const existingUser = await userReg.findOne({ email: convertEmail });

      if (existingUser) {
          return res.status(400).json({ success: false, message: "Email already exists. Please log in." });
      }

   const newCustomer = new userReg({fname, sname, email, password, phoneNum, dob});
   await newCustomer.save();

   res.status(201).json({ message: 'Customer registered successfully' });
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