"use client";

import { FormEvent, useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignInComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signin`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data) {
      toast.success('Signed in successfully');
      router.push('/');
    } else {
      toast.error('Failed to sign in');
    }
    console.log('Sign in attempted with:', { email, password });
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <User size={18} className="me-2" />
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <Lock size={18} className="me-2" />
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                <LogIn size={18} className="me-2" />
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <a href="#" className="text-decoration-none">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;