import jwt from "jsonwebtoken";

export const generateAccessToken = async (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

    res.cookie("access_token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      strict: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    })
  } catch (error) {
    console.error(`Error generating access token ${error.message}`);
    process.exit(1);
  }
}