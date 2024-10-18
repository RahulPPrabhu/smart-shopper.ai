import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { findUserByEmail } from "./UserAuthCheck/checkUserExist";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: NextRequest) {
    try {
        const _data = await req.json();

        const user = await findUserByEmail(_data);

        if (user && !user.error) {
            const token = await new SignJWT({ uid: user._id, role: user.role })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('2h')
                .sign(secret);

            const response = NextResponse.json({ user, token }, { status: 200 });
            response.cookies.set('token', token, {
                httpOnly: true, 
                path: '/',
                maxAge: 60 * 60 * 2, 
            });

            return response;
        } else if (user?.error) {
            return NextResponse.json({ message: user.error }, { status: 422 });
        } else {
            return NextResponse.json({ message: "Failed to sign up" }, { status: 422 });
        }
    } catch (error) {
        console.error("Error processing sign-up:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
