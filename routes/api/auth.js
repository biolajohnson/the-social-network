const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");

//@route GET api/auth
// test routes
//access private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error!");
  }
});

//@route    POST api/auth
// test     authenticate user and get token (login)
//access    public

router.post(
  "/",
  [
    check("email", "Please input correct email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid credentials" }] });
      }
      //make sure password matches
      const payload = {
        user: {
          id: user.id,
        },
      };
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid credentials" }] });
      }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) {
            throw new Error(err);
          }
          res.json({ token });
        }
      );
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
