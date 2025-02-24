import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../shared/navbar';
import { Label } from '../ui/label';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner'; // Ensure this is the correct toast library
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { setLoading, setUser } from '@/redux/authSlice'; // Adjust the path as needed

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Change Input Handler
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Form Submission
    const submitHandler = async (e) => {
        e.preventDefault();

        // Validate role
        if (!input.role) {
            toast.error("Please select your role (Student or Recruiter).");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user)); // Update user state in Redux
                navigate('/'); // Redirect to home or dashboard after successful login
            } else {
                toast.error(res.data.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error("Invalid email or password.");
                } else {
                    toast.error("An error occurred during login. Please try again.");
                }
            } else {
                toast.error("Network error. Please check your connection.");
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center min-h-screen bg-gray-900'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-custom'
                    style={{
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 6px 10px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <h1 className='text-2xl font-bold text-center text-white mb-6'>Login</h1>

                    {/* Email */}
                    <div className='mb-4'>
                        <Label htmlFor="email" className='text-gray-300 mb-2 block'>Email</Label>
                        <input
                            type="email"
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            id="email"
                            placeholder="example@example.com"
                            className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </div>

                    {/* Password */}
                    <div className='mb-4'>
                        <Label htmlFor="password" className='text-gray-300 mb-2 block'>Password</Label>
                        <input
                            type="password"
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                            id="password"
                            placeholder="Enter your password"
                            className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </div>

                    {/* User Type Selection */}
                    <fieldset className='mb-4'>
                        <legend className='text-gray-300 mb-2'>Are you a:</legend>
                        <div className='flex items-center space-x-4'>
                            <Label htmlFor="student" className='flex items-center text-gray-300 cursor-pointer'>
                                <input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='mr-2 cursor-pointer accent-indigo-500'
                                />
                                Student
                            </Label>
                            <Label htmlFor="recruiter" className='flex items-center text-gray-300 cursor-pointer'>
                                <input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='mr-2 accent-indigo-500'
                                />
                                Recruiter
                            </Label>
                        </div>
                    </fieldset>

                    {/* Login Button */}
                    <div className='mt-6'>
                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300'
                        >
                            {loading ? (
                                <Loader2 className='h-4 w-4 animate-spin inline-block' />
                                
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>

                    {/* Signup Link */}
                    <div className='mt-4 text-center'>
                        <span className='text-gray-400'>Don't have an account? </span>
                        <Link to="/signup" className="text-indigo-500 hover:underline">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;