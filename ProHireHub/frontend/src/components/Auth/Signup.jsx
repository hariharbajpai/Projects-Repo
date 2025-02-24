import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import Navbar from '../shared/navbar';
import { Label } from '../ui/label';
import axios from 'axios';
import { toast } from 'sonner'; // Ensure this is the correct toast library
import { Loader2 } from 'lucide-react';
import { setLoading } from '@/redux/authSlice'; // Import setLoading from Redux slice

const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null,
    });

    const { loading } = useSelector((store) => store.auth); // Access loading from Redux state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Change Input Handler
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // File Input Handler
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    // Form Submission
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            toast.error("Please select your role (Student or Recruiter).");
            return;
        }

        try {
            dispatch(setLoading(true)); // Set loading to true
            const formData = new FormData();
            formData.append("fullName", input.fullName);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("password", input.password);
            formData.append("role", input.role);

            if (input.file) {
                formData.append("file", input.file); // Append file only if it exists
            }

            const response = await axios.post("http://localhost:8000/api/v1/user/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                toast.success("Signup successful! Redirecting...");
                navigate("/login"); // Redirect to login page after successful signup
            } else {
                toast.error(response.data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error("An error occurred during signup. Please try again.");
        } finally {
            dispatch(setLoading(false)); // Set loading to false
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
                    <h1 className='text-2xl font-bold text-center text-white mb-6'>Sign Up</h1>

                    {/* Full Name */}
                    <div className='mb-4'>
                        <Label htmlFor="fullName" className='block text-gray-300 mb-2'>Full Name</Label>
                        <input
                            type="text"
                            value={input.fullName}
                            name='fullName'
                            id="fullName"
                            autoComplete="name"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </div>

                    {/* Email */}
                    <div className='mb-4'>
                        <Label htmlFor="email" className='block text-gray-300 mb-2'>Email</Label>
                        <input
                            type="email"
                            value={input.email}
                            name='email'
                            id="email"
                            autoComplete="email"
                            onChange={changeEventHandler}
                            placeholder="example@example.com"
                            className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </div>

                    {/* Phone Number */}
                    <div className='mb-4'>
                        <Label htmlFor="phoneNumber" className='block text-gray-300 mb-2'>Phone Number</Label>
                        <input
                            type="tel"
                            value={input.phoneNumber}
                            name='phoneNumber'
                            id="phoneNumber"
                            autoComplete="tel"
                            onChange={changeEventHandler}
                            placeholder="123-456-7890"
                            className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </div>

                    {/* Password */}
                    <div className='mb-4'>
                        <Label htmlFor="password" className='block text-gray-300 mb-2'>Password</Label>
                        <input
                            type="password"
                            value={input.password}
                            name='password'
                            id="password"
                            autoComplete="new-password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </div>

                    {/* User Type (Student/Recruiter) */}
                    <div className='mb-4'>
                        <Label className='block text-gray-300 mb-2'>Are you a:</Label>
                        <div className='flex items-center space-x-4'>
                            <div className='flex items-center'>
                                <input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='mr-2 cursor-pointer accent-indigo-500'
                                />
                                <Label htmlFor="student" className='text-gray-300'>Student</Label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='mr-2 cursor-pointer accent-indigo-500'
                                />
                                <Label htmlFor="recruiter" className='text-gray-300'>Recruiter</Label>
                            </div>
                        </div>
                    </div>

                    {/* Profile Picture Upload */}
                    <div className='flex items-center gap-2 mb-4'>
                        <Label htmlFor="profilePicture" className='text-gray-300'>Profile Picture</Label>
                        <div className='relative'>
                            <input
                                id="profilePicture"
                                accept='image/*'
                                type='file'
                                onChange={changeFileHandler}
                                className='hidden'
                            />
                            <label
                                htmlFor="profilePicture"
                                className='cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            >
                                Upload
                            </label>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <div className='mt-6'>
                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300'
                        >
                            {loading ? (
                                <Loader2 className='h-4 w-4 animate-spin inline-block' />
                            ) : (
                                'Sign Up' // Corrected button text
                            )}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className='mt-4 text-center'>
                        <span className='text-gray-400'>Already have an account? </span>
                        <Link to="/login" className="text-indigo-500 hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;