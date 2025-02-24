import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { User2, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
    const user = false; // This should be dynamically set based on authentication state
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-gray-900 border-b border-gray-800'>
            {/* Main Navbar Container */}
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                {/* Logo */}
                <div className='transform translate-z-10 hover:translate-z-20 transition-transform duration-300'>
                    <h1 className='text-2xl font-bold text-white'>
                        Pro <span className='text-[#F83002]'>Hire</span><span className='text-[#1A73E8]'>Hub</span>
                    </h1>
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-white focus:outline-none transform translate-z-10 hover:translate-z-20 transition-transform duration-300' aria-label="Toggle menu">
                        <Menu className='h-6 w-6' />
                    </button>
                </div>

                {/* Navigation Links and Auth Buttons */}
                <div className={`md:flex items-center gap-12 ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row w-full md:w-auto bg-gray-900 md:bg-transparent z-50`}>
                    {/* Navigation Links */}
                    <ul className='flex md:flex-row flex-col font-medium items-center gap-5 text-gray-300 w-full md:w-auto'>
                        <li className='hover:text-white transition duration-300 transform translate-z-10 hover:translate-z-20 p-4 md:p-0'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='hover:text-white transition duration-300 transform translate-z-10 hover:translate-z-20 p-4 md:p-0'>
                            <Link to="/jobs">Jobs</Link>
                        </li>
                        <li className='hover:text-white transition duration-300 transform translate-z-10 hover:translate-z-20 p-4 md:p-0'>
                            <Link to="/browse">Browse</Link>
                        </li>
                    </ul>

                    {/* Auth Buttons or User Avatar */}
                    {!user ? (
                        <div className='flex items-center gap-2 p-4 md:p-0'>
                            <Link to="/login">
                                <Button variant="outline" className='bg-transparent text-white border-gray-600 hover:bg-gray-800 hover:border-gray-500 transform translate-z-10 hover:translate-z-20 transition-transform duration-300'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className='bg-indigo-600 text-white border-none hover:bg-indigo-700 transform translate-z-10 hover:translate-z-20 transition-transform duration-300'>
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer border-2 border-indigo-500 hover:border-indigo-600 transform translate-z-10 hover:translate-z-20 transition-transform duration-300'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80 bg-gray-800 border-gray-700 transform translate-z-20'>
                                <div className='flex gap-4 p-4'>
                                    <Avatar className='cursor-pointer border-2 border-indigo-500'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium text-white'>Harihar Bajpai</h4>
                                        <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                                <div className='mt-4 flex flex-col gap-2 m-2'>
                                    <Button variant="link" className='p-0 justify-start gap-2 text-gray-300 hover:text-white'>
                                        <User2 className='h-4 w-4' />
                                        View profile
                                    </Button>
                                    <Button variant="link" className='p-0 justify-start text-red-500 hover:text-red-600 gap-2'>
                                        <LogOut className='h-4 w-4' />
                                        Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;