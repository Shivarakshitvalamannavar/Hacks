import { NextResponse } from "next/server";
import PowerSchema from "@/models/PowerSchema";
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

    if (!userEmail) {
      return NextResponse.json({ message: "Email not found in token" }, { status: 403 });
    }

    try {
      const { electricity_unit, electricity_value, country, state } = await req.json();
      const API_KEY = process.env.CARBON_INTERFACE_API_KEY;
      const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "electricity",
          electricity_unit,
          electricity_value: parseFloat(electricity_value),
          country,
          state,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emissions data");
      }

      const data = await response.json();
      const powerData = {
        data: {
          id: data.data.id,
          type: data.data.type,
          attributes: {
            country: data.data.attributes.country,
            state: data.data.attributes.state,
            electricity_unit: data.data.attributes.electricity_unit,
            electricity_value: data.data.attributes.electricity_value,
            estimated_at: data.data.attributes.estimated_at,
            carbon_g: data.data.attributes.carbon_g,
            carbon_lb: data.data.attributes.carbon_lb,
            carbon_kg: data.data.attributes.carbon_kg,
            carbon_mt: data.data.attributes.carbon_mt,
          },
        },
        user_id: userEmail,
        est_type:"Power" // Use actual user email from token
      };

      // Save the data to the database
      const newPowerEstimate = new PowerSchema(powerData);
      await newPowerEstimate.save();

      return NextResponse.json(data);
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: "Failed to fetch carbon estimate" }), { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to authenticate user" }, { status: 500 });
  }
}