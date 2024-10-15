"use client";

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ChatbotUI = () => {
    const [message, setMessage] = useState('');

    return (
        <div className="container-fluid bg-dark text-light min-vh-100 d-flex flex-column">
            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                <div className="container mb-4">
                    <div className="text-light mb-3">
                        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                            <h2 className="text-center mb-4">What can I help you with?</h2>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                        <button className="btn btn-secondary me-2">Help me order a laptop from the latest models</button>
                        <button className="btn btn-secondary">What is the status of my order with order number xxxxxx?</button>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control text-dark"
                            placeholder="Send a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="btn btn-outline-secondary" type="button">
                            <ArrowUp size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotUI;