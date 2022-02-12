// "MIDDLEWARE" take in POST req from app and send that post to Strapi our CMS
// Imports
import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    // Strapi calls email Identifier
    const { identifier, password } = req.body;

    // Send post req to strapi when app/api/login is hit
    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    // Strapi's response is a JWT and the info specified
    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // Set Cookie using cookie npm package
      console.log(data);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        // Strapi has odd error message, lots of drilling
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    // Only allow post req
    res.setHeader("Allow", ["POST"]);
    // If not post Send error message
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
