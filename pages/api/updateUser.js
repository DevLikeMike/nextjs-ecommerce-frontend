import cookie from "cookie";
import { API_URL } from "@/config/index";

// update User via backend

export default async (req, res) => {
  if (req.method === "PUT") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // Get token from cookie
    const { token } = cookie.parse(req.headers.cookie);

    // Make request to backend
    const strapiRes = await fetch(`${API_URL}/api/users/${req.body.id}`, {
      method: "PUT",
      // Declare headers
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // Declare body
      body: JSON.stringify({
        shippingAddress: req.body.shippingAddress,
      }),
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
