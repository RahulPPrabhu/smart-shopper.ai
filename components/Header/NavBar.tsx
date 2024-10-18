"use client";

import { LogInIcon, LogOutIcon, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function NavBar({cookie}: {cookie: any}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        if (cookie) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [cookie]);

    const handleSignIn = () => {
        router.push('/auth/sign-in');
    };

    const handleSignUp = () => {
        router.push('/auth/sign-up');
    };

    const handleCart = () => {
        router.push('/cart');
    };

    const handleLogOut = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {
            method: 'DELETE',
            cache: 'no-store'
        });
        const data = await res.json();
        if (data) { 
            setIsAuthenticated(false);
            toast.success('Signed out successfully');
        }
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0">
                    <img src='/images/logo.png' alt="logo" width={150} height={50} className="d-inline-block align-text-top mt-2" />
                </span>
                <div>
                    {isAuthenticated ? (
                        <>
                            <button className="btn btn-outline-light me-2" onClick={handleCart}>
                                Cart <ShoppingCart size={24} />
                            </button>
                            <button className="btn btn-outline-light me-2" onClick={handleLogOut}>
                                Sign out <LogOutIcon size={24} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-outline-light me-2" onClick={handleSignIn}>
                                Sign in <LogInIcon size={24} />
                            </button>
                            <button className="btn btn-outline-light" onClick={handleSignUp}>
                                Sign up <LogOutIcon size={24} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
