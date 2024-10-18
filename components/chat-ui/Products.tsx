import { Product } from "@/lib/types/product.dto";
import { Star } from "lucide-react";
import { toast } from "sonner";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

    const handleClick = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/Cart`, {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify(product)
        });
        const data = await res.json();
        if (data) {
            toast.success("Product added to cart");
        } else {
            toast.error("Failed to add product to cart");
        }
    }

    return (
        <div className="card mb-3 pointer-style" onClick={handleClick}>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <p className="card-text">
                    <strong>Rating:</strong> {product.rating} 
                    <Star className="ms-1" size={16} fill="gold" color="gold" />
                </p>
            </div>
        </div>
    );
};

export default ProductCard;