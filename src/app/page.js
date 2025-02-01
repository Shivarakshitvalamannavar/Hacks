"use client";  // Required for using hooks in Next.js App Router
import { useRouter } from "next/navigation";
import Button from "@/components/button/button";
export default function Home() {
  const router=useRouter();
  return (
    <div >
      <p>This is the home page mate lol </p>
      <Button text={"Click to sign up"} onClick={()=>router.push("/Signup")}/>
      <Button text={"Login"} onClick={()=>router.push("/Login")}/>
    </div>
  );
}
