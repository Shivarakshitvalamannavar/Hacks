// src/app/api/auth/login/route.js

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '@/models/UserSchema'; 
import bcrypt from "bcrypt"

export async function POST(req) {
  try {
    // Extract user credentials from the request
    const { email, password } = await req.json();

    // Find the user in the database (you can hash the password and compare it)
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(hashedPassword)
    // if (!user || user.password !== hashedPassword) {
    //   return new Response('Invalid credentials', { status: 401 });
    // }
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

    // Create a JWT token (you can include user data like ID)
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET, // Add a secret key in .env
      { expiresIn: '1h' }
    );

    // Set the token in an HTTP-only cookie
    const cookies = cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return new Response('Login successful', {
      status: 200,
      headers: {
        'Set-Cookie': cookies,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
