const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "your_jwt_secret"; // Define your JWT secret here

//  ROUTER 1 : Create a user (sign up)  using: POST "/api/auth/createuser." No login required
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),// these body will be  validation
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);//secure password secPass

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);// auth token based on id,payload(data),signature 
//  jwt.sign(data,jwt_secret)its a method that covert our data and jwt scret into authtoken
      success = true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred from router 1");
    }
  }
);

// ROUTE 2 : login a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {  // jo kese bhi promise ko resolve huny ka wait krty 
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;  // extract out the email,pass
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      // Compare the password with user's password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error from router 2");
    }
  }
);


//ROUTER 3 : get login user details using : POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // Assuming userId is supposed to come from the request body
    const userId = req.user.id; //get back the user id from the fetchuser :: req -> user -> id

    const user = await User.findById(userId).select("-password");//neglet the user password 

    // Handle the user data here
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong"); // Pass the error to the next middleware
  }
});
module.exports = router;
