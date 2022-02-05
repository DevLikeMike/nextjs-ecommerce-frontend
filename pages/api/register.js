import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    // Destruct req.body
    const { username, email, password } = req.body;

    // POST to strapi
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        shippingAddress: {
          country: "",
          city: "",
          address: "",
          postalCode: "",
        },
      }),
    });

    const data = await strapiRes.json();
    // Recieve strapi jwt just as login, but also with new user

    if (strapiRes.ok) {
      // Set Cookie
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
        // Drill for strapi error message
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
