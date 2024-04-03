// const express = require("express");
// const passport = require("passport");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const cors = require("cors");
// const DATA = [{ email: "test@gmail.com", password: "1234" }];
// const jwt = require("jsonwebtoken");
// const session = require("express-session");
// const {SpotifyLogged, SpotifyModel} = require("./model");
// const JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
// const connectDatabase = require("./connectDb");
// const app = express();
// const userRouter = require("./router/router");

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use("/", userRouter);

// let opts = {};
// opts.jwtFromRequest = function (req) {
//   let token = null;
//   if (req && req.cookes) {
//     token = req.cookies["jwt"];
//   }
//   return token;
// };

// opts.secretOrKey = "secret";
// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     console.log("JWT BASED VALIDATION GETTING CALLED");
//     console.log("JWT", jwt_payload);
//     if (CheckUser(jwt_payload.data)) {
//       return done(null, jwt_payload.data);
//     } else {
//       // user account doesnt exists in the DATA
//       return done(null, false);
//     }
//   })
// );


// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         "107709429312-uaok37b422911de1ppi4kke2qt5bg8ol.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: "http://localhost:3000/googleRedirect",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       //console.log(accessToken, refreshToken, profile)
//       console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED");
//       return cb(null, profile);
//     }
//   )
// );

// passport.serializeUser(function (user, cb) {
//   console.log("I should have jack ");
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   console.log("I wont have jack shit");
//   cb(null, obj);
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/googleRedirect",
//   passport.authenticate("google"),
//   async (req, res) => {
//     // console.log('redirected', req.user)
//     let user = {
//       name: req.user.name.givenName,
//       email: req.user._json.email,
//       picture: req.user.photos[0].value,
//     };

//     //   app.use('')

//     console.log("user", user);

//     try {
//       const existUser = await SpotifyModel.findOne({ email: user.email });
//       if (existUser) {
//         console.log("User already exist");
//         const loggUser = await SpotifyLogged.create(user);
//         // res.redirect("http://localhost:5173/login");
//         // console.log(req.user);
//         res.redirect("http://localhost:5173");
//       } else {
//         const newUser = await SpotifyModel.create(user);
//         const loggUser = await SpotifyLogged.create(user);

//         console.log("new user created ", newUser);
//         let token = jwt.sign(
//           {
//             data: user,
//           },
//           "secret",
//           { expiresIn: "100h" }
//         );
//         res.cookie("jwt", token);
//         let allData = req.user;
//         console.log(allData);
//         res.redirect("http://localhost:5173");
//       }
//     } catch (err) {
//       console.log("error on /google redirect", err);
//     }
//   }
// );

// const port = 3000;
// connectDatabase().then(() => {
//   app.listen(port, () => {
//     console.log(`Sever ARG0 listening on port ${port}`);
//   });
// });

// backend/server.js

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
app.use(bodyParser.json());
app.use(cors());

// // Define MongoDB schema
// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String
// });

// const User = mongoose.model('User', userSchema);


//new payment user schema
const paymentUserSchema = new mongoose.Schema({
  name: String,
  price: Number,
  status: String
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  payments: [paymentUserSchema]
});

const User = mongoose.model('User', userSchema);

const likedSongSchema = new mongoose.Schema({
  songUrl: String,
  img: String,
  songName: String,
  singer: String
});

const LikedSong = mongoose.model('LikedSong', likedSongSchema);

const playlistSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String
});

// Create a model based on the schema
const Playlist = mongoose.model('Playlist', playlistSchema);

// const Payment = mongoose.model('Payment', new mongoose.Schema({
//     name: String,
//     cardNumber: String,
//     expiry: String,
//     cvc: String,
//     amount: Number,
//   }));

const paymentSchema = new mongoose.Schema({
  name: String,

});

const Payment = mongoose.model("Payment", paymentSchema);
// Connect to MongoDB
mongoose.connect('mongodb+srv://venkadakrishnan:9150125514@cluster0.8aufid8.mongodb.net/musicdatas', { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected MongoDB');
// Handle signup requests

app.post('/updatepayment', async (req, res) => {
  const { email, name, price} = req.body;
  console.log(email,name,price);
  const status = "payment success";
  try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update the payments array with the new payment object
      user.payments.push({ name, price, status });
      await user.save();

      res.status(200).json({ message: 'Payment updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user with an empty payment array
    const newUser = new User({ username, email, password, payments: [] });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/login', async (req, res) => {
    // console.log("venkat");
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token with the username
        const token = jwt.sign({ username: user.username }, 'your_secret_key');

        res.status(200).json({ message: 'Login successful', token ,user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/addLikedSong', async (req, res) => {
  console.log('venkat');
  const { songUrl, img, songName, singer } = req.body;

  try {
      // Create a new document for the liked song
      const newLikedSong = new LikedSong({ songUrl, img, songName, singer });
      await newLikedSong.save();

      res.status(201).json({ message: 'Liked song added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/addPlaylist', async (req, res) => {
   
  const { title, description, img } = req.body;

  try {
      // Create a new playlist document in the database
      const newPlaylist = new Playlist({ title, description, img });
      await newPlaylist.save();

      res.status(201).json({ message: 'Playlist created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// app.post('/api/payment', async (req, res) => {
//     console.log('krish');
//     try {
//       const { name, cardNumber, expiry, cvc, amount } = req.body;
//       const payment = new Payment({ name, cardNumber, expiry, cvc, amount });
//       await payment.save();
//       res.status(201).json({ message: 'Payment successful' });
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

app.post("/api/payment", async (req, res) => {
  const { number, expiry, cvc, name } = req.body;

  try {
    const payment = new Payment({ number, expiry, cvc, name });
    await payment.save();
    res.status(201).json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ message: "Payment failed" });
  }
});



app.post('/api/sendotp', (req, res) => {
  const { email } = req.body;
  console.log('email');
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your Gmail email address
      pass: 'your-password', // Replace with your Gmail password
    },
  });
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    
    subject: 'OTP for payment confirmation',
    text: `Your OTP is: ${otp}`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Failed to send OTP:', error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    } else {
      console.log('OTP sent');
      res.json({ success: true, message: 'OTP sent successfully' });
    }
  });
});

// Confirm OTP
app.post('/api/confirmotp', (req, res) => {
  const { otp } = req.body;
  // Assuming the correct OTP is hardcoded for demonstration purposes
  if (otp === '123456') {
    res.json({ success: true, message: 'OTP confirmed successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Incorrect OTP' });
  }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
