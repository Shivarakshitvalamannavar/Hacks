import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { weight_value, weight_unit, distance_value, distance_unit, transport_method } = await req.json();

    const API_KEY = process.env.CARBON_INTERFACE_API_KEY; // Store API key in .env.local
    const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "shipping",
        weight_value,
        weight_unit,
        distance_value,
        distance_unit,
        transport_method,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch carbon estimation." }, { status: 500 });
  }
}
