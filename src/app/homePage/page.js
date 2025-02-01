// "use server";

// import { getUserFromCookie } from "@/lib/auth";
// import Button from "@/components/button/button";

// export default async function HomePage() {
//   const email = await getUserFromCookie(); // Fetch email from cookie
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       {email ? <p>Logged in as: {email}</p> : <p>You are not logged in.</p>}
//     </div>
//   );
// }
"use client";

import Button from "@/components/button/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const router=useRouter();
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/Auth/CookieCheck");
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  return (
    <div>
      {user ? <p>Logged in as: {user.email}</p> : <p>Not logged in</p>}
      <Button text={"Shipping"} onClick={()=>router.push("/Calculate/Shipping")}/>
    </div>
  );
}
