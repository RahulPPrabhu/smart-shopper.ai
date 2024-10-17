"use client";

import { LogInIcon, LogOutIcon, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavBar() {

    const router = useRouter();

    const handleSignIn = () => {
        router.push('/auth/sign-in');
    };

    const handleSignUp = () => {
        router.push('/auth/sign-up');
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0"> <img src='/images/logo.png' alt="logo" width={150} height={50} className="d-inline-block align-text-top mt-2" /> </span>
                <div>
                    <button className="btn btn-outline-light me-2" onClick={handleSignIn}>
                        Sign in <LogInIcon size={24} />
                    </button>
                    <button className="btn btn-outline-light" onClick={handleSignUp}>
                        Sign up <LogOutIcon size={24} />
                    </button>
                </div>
            </div>
        </nav>
    )
}
