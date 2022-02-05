import cookie from "cookie";
import { API_URL } from "@/config/index";

// Get orders of logged in user
export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const orders = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ orders });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
