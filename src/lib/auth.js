"use server"; 

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Use the same secret key

export async function getUserFromCookie() {
  const token = cookies().get("token")?.value; // Get token from cookie

  if (!token) return null; // No token found

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.email; // Return email from token
  } catch (error) {
    return null; // Token is invalid or expired
  }
}
