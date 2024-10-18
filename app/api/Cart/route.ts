import { NextRequest, NextResponse } from "next/server";
import { addProductToCart } from "./Product-Details/addProduct";

export async function POST(req: NextRequest) {
    const _data = await req.json();
    const userId = req.headers.get("uid");
    const cartDetails = await addProductToCart(_data, userId);
    if (cartDetails) {
        return NextResponse.json(cartDetails, { status: 200 });
    } else {
        return NextResponse.json({ message: "Failed to add product to cart" }, { status: 422 });
    }
}