import cookie from "cookie";
import { API_URL } from "@/config/index";

// Get orders of logged in user
export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // Get token from headers using cookie
    const { token } = cookie.parse(req.headers.cookie);

    // Get user Id from headers - sent as head because we are using a get request
    const { id } = req.headers;

    /*******************************
     * GET - @strapiAPI/api/orders - filted by userID
     * Private
     * Get all orders created by a user
     ******************************/
    const strapiRes = await fetch(
      `${API_URL}/api/orders?filters[userID][$eq]=${id}&populate=*`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userOrders = await strapiRes.json();
    const { data: orders } = userOrders;

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
