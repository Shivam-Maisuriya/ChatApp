import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generatetoken.js";

// Controller function to handle user signup
export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    if (!fullname || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance and save it to the database
    const newUser = await new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      return res.status(201).json({
        message: "User created successfully",
        user: {
          fullname: newUser.fullname,
          email: newUser.email,
          _id: newUser._id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // If the credentials are valid, create a token and save it in a cookie
    createTokenAndSaveCookie(user._id, res);
    return res.status(200).json({
      message: "User logged in successful",
      user: {
        fullname: user.fullname,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to handle user logout
export const logout = async (req, res) => {
  try {
    // res.clearCookie("jwt");  or
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {

    const loggedInUser = req.user._id;

    const filteredUsers = await User.find( {_id : {$ne : loggedInUser} } ).select("-password -__v");
    res.status(200).json( filteredUsers )
  } catch (error) {
    console.log("Error in allUsers controller: " + error);
  }
}
