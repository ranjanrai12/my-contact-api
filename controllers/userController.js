const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @POST Register user
 * @route /api/user/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    res.status(400);
    throw new Error("User already registered");
  }
  const hashPassword = await bycrypt.hash(req.body.password, 10);
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
  // send back to response
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  //   res.json({ message: "Register the user" });
});

/**
 * @POST Login user
 * @route /api/user/login
 * @access public
 */

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await userModel.findOne({ email });
  if (user && (await bycrypt.compare(password, user.password))) {
    // compare password with has password
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
      //   { expiresIn: "1m" }
    );
    // set the cookie at client end
    // res.cookie("uid", accessToken, {
    //   httpOnly: true,
    //   secure: false, // Set to true if you're using HTTPS
    //   sameSite: "Lax",
    // });
    res.status(200).json({ accessToken, email: user.email, id: user.id });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

/**
 * @GET Login user
 * @route /api/user/login
 * @access private
 */
const currentUserInfo = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUserInfo };
