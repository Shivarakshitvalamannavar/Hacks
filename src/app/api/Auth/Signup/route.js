import User from "@/models/UserSchema";
import bcrypt from "bcrypt"


export async function POST(req) {
    try {
      const { username, email, password } = await req.json();
      
        console.log(username)
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
      
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
    } catch (error) {
      console.error("Error registering user:", error);
      return new Response(JSON.stringify({ message: "Error registering user" }), { status: 500 });
    }
}