import { NextResponse } from "next/server";
import FuelSchema from "@/models/FuelSchema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    console.log(userEmail);
    console.log("Here")

    if (!userEmail) {
      return NextResponse.json({ message: "Email not found in token" }, { status: 403 });
    }

    try {
      const { fuel_source_type, fuel_source_unit, fuel_source_value } = await req.json();
      const API_KEY = process.env.CARBON_INTERFACE_API_KEY;
      const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "fuel_combustion",
          fuel_source_type,
          fuel_source_unit,
          fuel_source_value: parseFloat(fuel_source_value),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emissions data");
      }

      const data = await response.json();
      const estimateData = {
        data: {
          id: data.data.id,
          type: data.data.type,
          attributes: {
            fuel_source_type: data.data.attributes.fuel_source_type,
            fuel_source_unit: data.data.attributes.fuel_source_unit,
            fuel_source_value: data.data.attributes.fuel_source_value,
            estimated_at: data.data.attributes.estimated_at,
            carbon_g: data.data.attributes.carbon_g,
            carbon_lb: data.data.attributes.carbon_lb,
            carbon_kg: data.data.attributes.carbon_kg,
            carbon_mt: data.data.attributes.carbon_mt,
          },
        },
        user_id: userEmail,
        est_type: "FuelCombustion",
      };

      // Save the data to the database
      console.log("Before entering databases")
      const newFuelEstimate = new FuelSchema(estimateData);
      await newFuelEstimate.save();
      console.log("After entering databse")

      return NextResponse.json(data);
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: "Failed to fetch carbon estimate" }), { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to authenticate user" }, { status: 500 });
  }
}
