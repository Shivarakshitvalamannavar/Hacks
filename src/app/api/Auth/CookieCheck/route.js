import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // Get the token from cookies
    const token = cookies().get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return new Response(JSON.stringify({ email: decoded.email }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
}
