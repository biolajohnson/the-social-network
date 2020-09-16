const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

const router = express.Router();

//@route GET api/profile/me
// test get current user profile
//access private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ message: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
// test create or update user profile
//access private

router.post(
  "/",
  [
    auth,
    [
      check("status", " Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      location,
      bio,
      company,
      website,
      status,
      skills,
      githubusername,
      youtube,
      facebook,
      instagram,
      twitter,
      linkedIn,
    } = req.body;
    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (bio) profileFields.bio = bio;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (githubusername) profileFields.githubusername = githubusername;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    //build social fields

    profileFields.socials = {};
    if (youtube) profileFields.socials.youtube = youtube;
    if (twitter) profileFields.socials.twitter = twitter;
    if (instagram) profileFields.socials.instagram = instagram;
    if (linkedIn) profileFields.socials.linkedIn = facebook;
    if (facebook) profileFields.socials.facebook = facebook;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }
      //create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile
// test get all profiles
//access public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.send(profiles);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/profile/user/user_id
// test get profile by user_id
//access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ message: "Profile not found" });
    }
    res.send(profile);
  } catch (e) {
    console.log(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).json({ message: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
