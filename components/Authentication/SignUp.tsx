"use client";

import { FormEvent, useState } from 'react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data) {
      toast.success('Signed up successfully');
      router.push('/');
    } else {
      toast.error('Failed to sign up');
    }
    console.log('Sign up attempted with:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <User size={18} className="me-2" />
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <Mail size={18} className="me-2" />
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                <Lock size={18} className="me-2" />
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                <UserPlus size={18} className="me-2" />
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-3 text-center">
            Already have an account? <Link href="/auth/sign-in" className="text-decoration-none">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
