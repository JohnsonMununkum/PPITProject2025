//adding express to my app
//express.js handles server-side logic 
//allows the app to process api requests like CRUD (create, read, update & delete)
//jwt and bcrypt hashinng password and verifying jwts
//adding twilio for sms notifications & nodemlaier for email notifications
const express = require('express');
const app = express();
const port = 4000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

  //constant variaable for maxnumofpeople per booking & maxbookingspertime
  const MAXPPL_PERBOOKING = 6;
  const BOOKING_SAME_TIMEANDDATE = 4;

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
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: String,
    phoneNum: String,
    dob: Date //date of birth

 });

const userReg = mongoose.model('userReg', userRegSchema);

//schema for making a rservation
const reservationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    numOfPeople: { type: Number, required: true, min: 1, max: 6 },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userReg' },
    created_at: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

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
        //console.log("Password is correct");
        //return res.json({ success: true });
         // Generate a token
        const token = jwt.sign({ email: foundEmail.email, id: foundEmail._id }, 'your_secret_key', { expiresIn: '1h' });

        // Send success response WITH the token
      return res.json({ 
        success: true, 
        token: token,
        userId: foundEmail._id,
        name: foundEmail.fname
      });
    	} 
        else 
        {
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

       // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10); 

   const newCustomer = new userReg({fname, sname, email, password: hashedPassword, phoneNum, dob});
   await newCustomer.save();

   res.status(201).json({ message: 'Customer registered successfully' });
});

// Middleware to authenticate user using JWT
const authenticateUser = (req, res, next) => {
    // Get token from Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        req.user = decoded; 
        next();
    });
};

//check the availablity of the booking
async function checkAvailability(date, time, numberOfPeople) {
    //only 6 ppl allowed per bookig
    if (numberOfPeople > MAXPPL_PERBOOKING) {
        return { available: false, message: 'Maximum 6 people per reservation' };
    }
    
     //creating reservation start and end time for a particuar day
     const startDate = new Date(date);
     startDate.setHours(0, 0, 0, 0);
     
     const endDate = new Date(startDate);
     endDate.setDate(endDate.getDate() + 1);
     
     console.log(`Checking availability for ${startDate.toISOString()} to ${endDate.toISOString()} at ${time}`);
     
     //check how many reservations are already there 
    const existingReservations = await Reservation.countDocuments({
        date: {
            $gte: startDate,
            $lt: endDate
        },
        startTime: time
    });
    
    //deugging to check if it got the correct amount of reservations in the database
    //console.log(`Found ${existingReservations} existing reservations`);
    
    //if there are more than 4 reservations for the same time and same date user cannot make an additional booking
    //they will have to select a different time or date
    if (existingReservations >= BOOKING_SAME_TIMEANDDATE) {
        return { 
            available: false, 
            message: 'Sorry, no tables available at this time. Please try another time or date.'
        };
    }
    
    return { available: true };
}

//reservations 
//first we check to see if the booking the want to make is available
//we use the checkAvailability function for that
//if it is available we store the date , start-time, end-time, number of people for the rservation & the user id
//this is the saved up onto our mongo db database for the reservations
app.post('/reservations', authenticateUser, async (req, res) => {
    const { date, time, numberOfPeople } = req.body;
    const userId = req.user.id; 

    const availability = await checkAvailability(new Date(date), time, numberOfPeople);

    if (availability.available) {
        const newReservation = new Reservation({
            date: new Date(date),
            startTime: time,
            endTime: calculateEndTime(time),
            numOfPeople: numberOfPeople,
            user_id: userId,
        });
        
        await newReservation.save();

        //find users email and phone number
        const user = await userReg.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User details not found' });
        }
       
        return res.json({ success: true, message: 'Reservation successful!' });
    } else {
        return res.status(400).json({ success: false, message: availability.message });
    }
});

//calculate end time is for the end time 
//each booking is an hour & 30mins from their start time
function calculateEndTime(startTime) {
    const timeMap = {
        '6:00 PM': '7:30 PM',
        '7:00 PM': '8:30 PM',
        '8:00 PM': '9:30 PM',
    };
    return timeMap[startTime] || '7:30 PM'; 
}

//getting a user's reservations 
app.get('/my-reservations', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;

        console.log("Fetching reservations for user ID:", userId);

        //find the users reservations & sort them by date & time
        const reservations = await Reservation.find({ user_id: userId }).sort({ date: 1, startTime: 1 });

        //return the reservations
        res.status(200).json({ success: true, reservations });
        //if unable to get the reservations
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ success: false, message: "Failed to fetch reservations" });
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