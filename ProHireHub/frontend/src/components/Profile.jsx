import React from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Pen, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label'
import { motion } from "framer-motion";



const Profile = () => {
  const skills = ['React', 'Node.js', 'MongoDB'];
  const isResume = true;

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>Full Name</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, aliquam.</p>
            </div>
          </div>
          <Button variant="outline">
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        <div className='mt-6 space-y-4'>
          <div className='flex items-center gap-2'>
            <Mail className="h-5 w-5 text-gray-500" />
            <span className='text-gray-700'>harihar701764@gmail.com</span>
          </div>
          <div className='flex items-center gap-2'>
            <Phone className="h-5 w-5 text-gray-500" />
            <span className='text-gray-700'>7017645320</span>
          </div>
        </div>

        <div className='mt-6'>
          <h2 className='font-bold mb-2'>Skills</h2>
          <div className='flex gap-2 flex-wrap'>
            {skills.length !== 0 ? (
              skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {isResume ? (
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Resume
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
