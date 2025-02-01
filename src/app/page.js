"use client"; // Required for using hooks in Next.js App Router
import { useRouter } from "next/navigation";
import Button from "@/components/button/button";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #c8e6c9)", // Light green and blue gradient
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)", // Semi-transparent white
          padding: "2.5rem", // Increased padding
          borderRadius: "1rem", // More rounded corners
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadow
          width: "100%",
          maxWidth: "400px", // Fixed width for consistency
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
          border: "1px solid #e0e0e0", // Light border
        }}
      >
        <h1
          style={{
            fontSize: "2rem", // Larger title
            fontWeight: "700",
            marginBottom: "1.5rem", // More spacing
            color: "#2e7d32", // Dark green for eco-friendly theme
          }}
        >
          Welcome to CarbonEco
        </h1>
        <p
          style={{
            fontSize: "1.1rem", // Slightly larger font
            color: "#555", // Slightly lighter text
            marginBottom: "1.5rem", // More spacing
          }}
        >
          This is the home page. Calculate your carbon footprint and take steps to reduce it!
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem", // Slightly more spacing between buttons
          }}
        >
          <Button
            text={"Click to sign up"}
            onClick={() => router.push("/Signup")}
            style={{
              backgroundColor: "#4caf50", // Green for eco-friendly theme
              color: "white",
              padding: "0.75rem 1.5rem", // Larger button
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth hover effect
            }}
          />
          <Button
            text={"Login"}
            onClick={() => router.push("/Login")}
            style={{
              backgroundColor: "#4caf50", // Green for eco-friendly theme
              color: "white",
              padding: "0.75rem 1.5rem", // Larger button
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth hover effect
            }}
          />
        </div>
      </div>
    </div>
  );
}