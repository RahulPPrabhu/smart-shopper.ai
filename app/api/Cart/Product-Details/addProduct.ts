import { Product } from "@/lib/types/product.dto";
import Cart from "@/models/Cart";
import dbConnect from "@/utils/db";

export async function addProductToCart(_data: Product, userId: string | null) {
    await dbConnect();

    const product = await new Cart({
        userId: userId,
        productName: _data.name,
        productDescription: _data.description,
        productPrice: _data.price,
        ratings: _data.rating
    });

    const result = await product.save();
    if (result) {
        return result;
    } else {
        return null;
    }
}