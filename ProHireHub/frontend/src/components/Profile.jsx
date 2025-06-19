import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Pen, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { motion } from "framer-motion";
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';

const skills = ['React', 'Node.js', 'MongoDB'];
const isResume = true;

const Profile = () => {
  const [open , setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Profile Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          {/* Profile Header */}
          <div className='flex justify-between items-start mb-6'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-24 w-24 border-2 border-gray-100'>
                <AvatarImage
                  src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className='font-medium text-2xl text-gray-800'>Full Name</h1>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, aliquam.</p>
              </div>
            </div>
            <Button onClick={()=>setOpen(true)} variant="outline" size="sm">
              <Pen className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Contact Information */}
          <div className='space-y-3 mb-6'>
            <div className='flex items-center gap-2'>
              <Mail className="h-5 w-5 text-gray-500" />
              <span className='text-gray-700'>harihar701764@gmail.com</span>
            </div>
            <div className='flex items-center gap-2'>
              <Phone className="h-5 w-5 text-gray-500" />
              <span className='text-gray-700'>7017645320</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className='mb-6'>
            <h2 className='font-bold text-lg mb-3 text-gray-800'>Skills</h2>
            <div className='flex gap-2 flex-wrap'>
              {skills.length > 0 ? (
                skills.map((item, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills added</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div>
            <Label className='text-lg font-bold text-gray-800 mb-2'>Resume</Label>
            {isResume ? (
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                View Resume
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <span className="text-gray-500">No resume uploaded</span>
            )}
          </div>
        </motion.div>

        {/* Applied Jobs Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <h1 className='text-xl font-bold mb-6 text-gray-800'>Applied Jobs</h1>
          <AppliedJobTable />
        </motion.div>
      </div>
      <UpdateProfileDialog open={open} setOpen = {setOpen}   />
    </div>
  );
};

export default Profile;