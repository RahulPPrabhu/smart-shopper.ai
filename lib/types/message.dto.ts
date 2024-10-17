import { Product } from "./product.dto";

export interface Message {
    userMessage: string;
    botMessage: Product[];
}