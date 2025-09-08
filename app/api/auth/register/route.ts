import { connectToDatabase } from "@/lib/db";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest){
    try {
        const {email, password} = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error : "Email and password are required."},
                {status : 400}
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return NextResponse.json(
                {error : "User already exists."},
                {status : 404}
            );
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 400 }
        );
    } catch (error) {
        console.log("Registration error:", error);
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 400 }
        );
    }
}