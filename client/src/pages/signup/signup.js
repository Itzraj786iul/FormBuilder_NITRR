"use client"
import "../../app/globals.css";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contact: '',
        clubName: '',
        position: '',
        securityKey: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const body = document.querySelector('body');
        if (darkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }, [darkMode]);

    const formFields = [
        { label: 'First Name', type: 'text', field: 'firstName' },
        { label: 'Last Name', type: 'text', field: 'lastName' },
        { label: 'E-mail Address', type: 'email', field: 'email' },
        { label: 'Password', type: 'password', field: 'password' },
        { label: 'Contact Number', type: 'tel', field: 'contact' },
        { label: 'Club / Committee Name', type: 'text', field: 'clubName' },
        { label: 'Your Position', type: 'text', field: 'position' },
        { label: 'Security Key', type: 'text', field: 'securityKey' }
    ];

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First Name is required";
        if (!formData.lastName) newErrors.lastName = "Last Name is required";
        if (!formData.email.includes('@')) newErrors.email = "Invalid email format";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!formData.contact) newErrors.contact = "Contact Number is required";
        if (!formData.clubName) newErrors.clubName = "Club/Committee Name is required";
        if (!formData.position) newErrors.position = "Position is required";
        if (!formData.securityKey) newErrors.securityKey = "Security Key is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Data:", formData);
        }
    };

    const backgroundStyle = darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100';

    return (
        <div className={`flex min-h-screen ${backgroundStyle}`}>
            {/* Left Side - Fixed */}
            <div className="w-1/2 fixed left-0 top-0 h-full flex flex-col justify-center items-center text-center p-12">
                <motion.h1 
                    className={`text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-blue-600'}`} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    Welcome to
                </motion.h1>
                <motion.h2 
                    className={`text-4xl font-semibold mb-8 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    ICell Form Builder Web
                </motion.h2>
                <motion.p 
                    className={`max-w-xl text-lg mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Your go-to solution for creating, managing, and deploying professional forms easily.
                </motion.p>
                <div className="flex space-x-4">
                    <motion.button 
                        type="button" 
                        className={`px-8 py-3 rounded-full text-lg border-2 transition duration-300 ${darkMode ? 'bg-blue-600 text-white border-blue-400 hover:bg-blue-700' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'}`} 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link href="/signin/signin">Login</Link>
                    </motion.button>
                </div>
            </div>

            <div className="w-1/2 ml-auto">
                <div className="h-screen overflow-y-auto">
                    <motion.div 
                        className={`p-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-l-[100px] shadow-2xl min-h-full`}
                        initial={{ x: 300, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Create your account</h2>
                            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-800" />}
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {formFields.map((field) => (
                                <motion.div 
                                    key={field.label}
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-4"
                                >
                                    <label htmlFor={field.label.toLowerCase().replace(/ /g, '-')} className={`block font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{field.label}</label>
                                    <input
                                        type={field.type}
                                        id={field.label.toLowerCase().replace(/ /g, '-') }
                                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                                        value={formData[field.field]}
                                        onChange={(e) => setFormData({ ...formData, [field.field]: e.target.value })}
                                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-blue-300 focus:ring-blue-500'}`}
                                    />
                                    {errors[field.field] && <span className="text-red-500">{errors[field.field]}</span>}
                                </motion.div>
                            ))}
                            <div className="text-center mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className={`w-full mt-6 p-3 rounded-full text-white font-semibold transition-all duration-300 ${
                                        darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                               Sign Up
                                </motion.button>
                                <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Already have an account?{' '}
                                    <button type="button" className="font-semibold underline hover:text-blue-800">Sign In</button>
                                </p>
                                
                                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>OR</p>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>If you have any problems, contact the technical team.</p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}