import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const deletedCookie = cookies().delete("token");
    console.log("Cookie:", deletedCookie);
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
}