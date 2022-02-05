import cookie from "cookie";
import { API_URL } from "@/config/index";

// Get one order that must be owned by the user requesting
export default async (req, res) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);
    const { id } = req.body;

    const strapiRes = await fetch(`${API_URL}/orders/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const order = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ order });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
