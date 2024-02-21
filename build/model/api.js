import Users from "../model/user.js";
import Profiles from "../model/profiles.js";
import express from "express";
const app = express.Router();

app.get("/launcher/token/:token", async (req, res) => {
  try {
    const accountToken = req.params.token;

    // Log the token received from the launcher
    console.log("Received account token:", accountToken);

    const profile = await Users.findOne({ accountToken }).lean();
    var email = "";
    var password = "";

    if (profile) {
      const user = await Users.findOne({ accountId: profile.accountId }).lean();

      if (user) {
        email = user.email;
        password = user.password;
        // Log the email associated with the user
        console.log("Found email:", email);
        console.log("Found password:", password);
      } else {
        // Log if user not found
        console.log("User not found for account token:", accountToken);
      }
    } else {
      // Log if profile not found
      console.log("Profile not found for account token:", accountToken);
    }

    res.json({ "Email": email });
    res.json({ "Password": password });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;