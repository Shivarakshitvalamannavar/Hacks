"use client";

import Button from "@/components/button/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/homePage.css"; // Import the CSS file

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/Auth/CookieCheck");
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="eco-icon"></div> {/* Eco-friendly icon */}
        <h1 className="title">Welcome to CarbonEco</h1>
        {user ? (
          <p className="message">Logged in as: {user.email}</p>
        ) : (
          <p className="message">Not logged in</p>
        )}
        <p className="message">
          Calculate your carbon footprint and take steps to reduce it!
        </p>
        <div className="button-container">
          <Button
            text={"Shipping"}
            onClick={() => router.push("/Calculate/Shipping")}
            className="w-full"
          />
          <Button
            text={"Power"}
            onClick={() => router.push("/Calculate/Power")}
            className="w-full"
          />
          <Button
            text={"Flights"}
            onClick={() => router.push("/Calculate/Flight")}
            className="w-full"
          />
          <Button
            text={"Fuel"}
            onClick={() => router.push("/Calculate/Fuel")}
            className="w-full"
          />
          <Button
            text={"Dashboard"}
            onClick={() => router.push("/Dashboard")}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}