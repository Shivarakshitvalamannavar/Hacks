// import jwt from "jsonwebtoken"
// export async function POST(req) {
//     try {
//       const { passengers, distance_unit, legs } = await req.json();
//       const API_KEY = process.env.CARBON_INTERFACE_API_KEY;
//       const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${API_KEY}`, // Store API key in .env
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           type: "flight",
//           passengers: parseInt(passengers),
//           distance_unit,
//           legs,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch emissions data");
//       }
  
//       const data = await response.json();
//       return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
//     } catch (error) {
//       return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
//     }
//   }
import { NextResponse } from "next/server";
import FlightSchema from "@/models/FlightSchema";
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
      const { passengers, distance_unit, legs } = await req.json();
      const API_KEY = process.env.CARBON_INTERFACE_API_KEY;
      const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "flight",
          passengers: parseInt(passengers),
          distance_unit,
          legs,
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
            passengers: data.data.attributes.passengers,
            legs: data.data.attributes.legs,
            estimated_at: data.data.attributes.estimated_at,
            carbon_g: data.data.attributes.carbon_g,
            carbon_lb: data.data.attributes.carbon_lb,
            carbon_kg: data.data.attributes.carbon_kg,
            carbon_mt: data.data.attributes.carbon_mt,
            distance_unit: data.data.attributes.distance_unit,
            distance_value: data.data.attributes.distance_value,
          },
        },
        user_id: userEmail,
        est_type:"Flight" // Use actual user email from token
      };

      // Save the data to the database
      const newFlightEstimate = new FlightSchema(estimateData);
      await newFlightEstimate.save();

      return NextResponse.json(data);
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: "Failed to fetch carbon estimate" }), { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to authenticate user" }, { status: 500 });
  }
}
