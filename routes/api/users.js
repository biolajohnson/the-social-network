const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
//@route   POST api / users
// test    register user
//access    public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please input correct email").isEmail(),
    check(
      "password",
      "the minimum of 6 characters for your password"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: "User already exists" }] });
      }

      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "PG",
        d: "mm",
      });
      user = new User({
        email,
        name,
        password,
        avatar,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
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
