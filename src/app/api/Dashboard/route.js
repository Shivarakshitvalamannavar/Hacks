import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ShippingEstimate from "@/models/ShippingSchema";
import FlightEstimate from "@/models/FlightSchema";
import FuelEstimate from "@/models/FuelSchema";
import Powerestimate from "@/models/PowerSchema";

export async function GET(req) {
  try {
    // Extract and verify the JWT token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    if (!userEmail) {
      return new NextResponse(JSON.stringify({ error: "Invalid token, email missing" }), { status: 403 });
    }

    // Ensure DB connection

    // Aggregate emissions for each collection based on userEmail
    const [flightEmissions, fuelEmissions, powerEmissions, shippingEmissions] = await Promise.all([
      FlightEstimate.aggregate([
        { $match: { user_id: userEmail } },
        { $group: { _id: null, total_carbon_kg: { $sum: "$data.attributes.carbon_kg" } } }
      ]),
      FuelEstimate.aggregate([
        { $match: { user_id: userEmail } },
        { $group: { _id: null, total_carbon_kg: { $sum: "$data.attributes.carbon_kg" } } }
      ]),
      Powerestimate.aggregate([
        { $match: { user_id: userEmail } },
        { $group: { _id: null, total_carbon_kg: { $sum: "$data.attributes.carbon_kg" } } }
      ]),
      ShippingEstimate.aggregate([
        { $match: { user_id: userEmail } },
        { $group: { _id: null, total_carbon_kg: { $sum: "$data.attributes.carbon_kg" } } }
      ]),
    ]);

    return NextResponse.json({
      flightEmissions: flightEmissions[0]?.total_carbon_kg || 0,
      fuelEmissions: fuelEmissions[0]?.total_carbon_kg || 0,
      powerEmissions: powerEmissions[0]?.total_carbon_kg || 0,
      shippingEmissions: shippingEmissions[0]?.total_carbon_kg || 0,
    });
  } catch (error) {
    console.error("Error fetching emissions:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
