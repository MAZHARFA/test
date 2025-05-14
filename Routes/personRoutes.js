const express = require("express");
const router = express.Router();
const Person = require("../models/person");
// const passport = require("./Auth");

const app = express();

const { jwtAuthMiddleware, generateToken } = require("../Jwt");

// Create a new Person (POST /person)
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    // console.log(`newPerson :: `, newPerson);
    const response = await newPerson.save();
    console.log("Data saved:", response); //debug

    //     //payload function
    const payload = {
      id: response.id,
      email: response.email,
      username: response.Name,
    };
    console.log(JSON.stringify(payload));

    //     //generate token after the userdata saved
    const token = generateToken({ payload });
    console.log("token is:", token);

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({ message: "You have successfully sign up" });
  } catch (err) {
    console.error("Error saving person:", err.message);
    res
      .status(500)
      .json({ error: "Failed to save person", details: err.message });
  }
});

// Get all Persons (GET /person)
// router.get("/", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log("Data fetched");
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("Error fetching persons:", err.message);
//     res
//     .status(500)
//     .json({ error: "Failed to fetch persons", details: err.message });
//   }
// });
// const localAuthMiddleware = passport.authenticate("local", { session: false });

//person login routes

router.post("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await Person.findOne({ email }).orFail();
    console.log("users", user); //debug

    // const payload = {
    //   email: user.email,
    //   password: user.password,
    // };
    // console.log(JSON.stringify(payload));



    if (user) {
      return res.status(200).json({ message: "login successfully" });
    }
    console.log(`here 1`)

    if (!user) {
      console.log(`here 2`)
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`here 3`)

    res.json({ user });
  } catch (error) {
    console.log(`Error ::`);
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Server error", error: "User cannot Exist" });
  }
});

// put/patch person id

router.put("/signup:person_id", async (req, res) => {
  try {
    const personId = req.params.person_id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching persons:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch persons", details: err.message });
  }
});

// // delete person id
router.delete("/signup:person_id", async (req, res) => {
  try {
    const personId = req.params.person_id;

    const response = await Person.findByIdAndDelete(personId, {});

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("Data updated");
    res.status(200).json({ message: "person data deleted successfully" });
  } catch (err) {
    console.error("Error fetching persons:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch persons", details: err.message });
  }
});

module.exports = router;

// //Router get profile

// router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
//   try{
//       const userData=req.user;
//       console.log("userData.  ",  userData)
//       const userId=userData.id;
//       const user=await Person.findById(userId);
//       res.status(200).json({user});
//   }catch(err){
//     console.error(err);
//     res.status(500).json({ error: "Internal server Error" });
//   }

// })



