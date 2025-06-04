import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d", // Token expiration time
  });
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is sent over HTTPS
    sameSite: "strict", // Prevents CSRF attacks by restricting cookie to same-site requests
  });
};

export default createTokenAndSaveCookie;
