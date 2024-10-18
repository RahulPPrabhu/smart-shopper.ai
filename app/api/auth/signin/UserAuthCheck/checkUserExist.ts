import User from "@/models/User";
import dbConnect from "@/utils/db";
import bcrypt from "bcryptjs";
import { UserAuthCheck } from "@/lib/types/user.dto";

export async function findUserByEmail(_data: UserAuthCheck) {
    try {
        await dbConnect();
        const user = await User.findOne({ email: _data.email });
        if (!user) {
            return { error: "User not found" };
        }
        const isPasswordValid = await bcrypt.compare(_data.password, user.password);
        if (!isPasswordValid) {
            return { error: "Invalid credentials" };
        }
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        return { error: "Error finding user" };
    }
}
