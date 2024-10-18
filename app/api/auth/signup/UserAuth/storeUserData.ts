import { UserAuth } from "@/lib/types/user.dto";
import User from "@/models/User";
import dbConnect from "@/utils/db";
import bcrypt from "bcryptjs";

export async function storeUserAuthData(_data: UserAuth) {
    try {
        await dbConnect();

        const existingUser = await User.findOne({ email: _data.email });
        if (existingUser) {
            return { error: "Email already in use" };
        }

        const hashedPassword = await bcrypt.hash(_data.password, 10);

        const user = await new User({
            name: _data.name,
            email: _data.email,
            password: hashedPassword,
            role: "Customer"
        }).save();

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error saving user:", error);
        return null;
    }
}
