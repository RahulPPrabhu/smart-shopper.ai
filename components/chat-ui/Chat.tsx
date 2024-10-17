"use client";

import React, { useState, ChangeEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { Product } from '@/lib/types/product.dto';
import ProductCard from './Products';
import { Message } from '@/lib/types/message.dto';

const ChatbotUI = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Laptop");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const prompt = `You are an e-commerce assistant. Based on the user's request, provide recommendations for 5 specific products. Return only a JSON array containing 5 objects, each with the following structure:
    [
      {
        "name": "Product Name",
        "description": "Brief product description",
        "price": "Price in numerical format (e.g. 19.99)",
        "rating": "Rating out of 5 (e.g. 4.5)"
      },
      ...
    ]
    
    Do not include any additional text, explanations, or context outside of the JSON array. Ensure all 5 products are relevant to the user's request.
    
    User's request: ${selectedCategory}`;

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/GenAI`, {
                method: 'POST',
                cache: 'no-store',
                body: JSON.stringify(prompt)
            });

            const data = await res.json();
            console.log("Data:", data);
            if (data) {
                const products: Product[] = JSON.parse(data);
                const newMessage: Message = {
                    userMessage: `Looking for ${selectedCategory}`,
                    botMessage: products
                };
                setMessages([...messages, newMessage]);
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="container-fluid min-vh-100">
            <div className="row h-100">
                <div className="col-12 col-md-8 col-lg-6 mx-auto d-flex flex-column">
                    <div className="flex-grow-1 overflow-auto mb-3" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                        {messages.length > 0 ? (
                            messages.map((message, index) => (
                                <div key={index} className="mb-4">
                                    <div className="alert alert-secondary">
                                        {message.userMessage}
                                    </div>
                                    <div>
                                        {message.botMessage.map((product, productIndex) => (
                                            <ProductCard key={productIndex} product={product} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center my-5 text-light">
                                <h2>What can I help you with?</h2>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto">
                        <div className="input-group mb-3">
                            <span className="input-group-text">You are looking for</span>
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="form-select"
                            >
                                <option value="Laptop">Laptop</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Smart Watches">Smart Watches</option>
                            </select>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    <ArrowUp size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotUI;