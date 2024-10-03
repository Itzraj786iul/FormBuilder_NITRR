import React, { useState, useEffect } from 'react';
import "../../app/globals.css";
import { RxCross2 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";
import { IoDuplicate } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ImagePreview from '@/components/ImagePreview';
import Image from 'next/image';

const FormBuilder = () => {
  const [formName, setFormName] = useState('');
  const [userName, setUserName] = useState('User-Name');
  const [formDes, setFormDes] = useState('');
  const [questions, setQuestions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [seed, setSeed] = useState('');
  const [firstReload, setFirstReload] = useState(true);

  const handleImageSelect = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    setFirstReload(false);
    if (typeof window !== 'undefined') {
      let savedSeed = localStorage.getItem('avatarSeed');
      if (!savedSeed) {
        savedSeed = Math.random().toString(36).substring(7);
        localStorage.setItem('avatarSeed', savedSeed);
      }
      setSeed(savedSeed);
    }
  }, []);

  const avatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${seed}`;

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const backgroundStyle = darkMode
    ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'
    : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100';

  const generateId = () => Math.random().toString(36).slice(2, 9);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: generateId(), questionName: '', questionType: 'single', options: [''], required: false }]);
  };

  const handleDuplicateQuestion = (index) => {
    const newQuestions = [...questions];
    const duplicatedQuestion = {
      ...questions[index],
      id: generateId(),
      options: [...questions[index].options],
    };
    newQuestions.splice(index + 1, 0, duplicatedQuestion);
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
    setQuestions(updatedQuestions);
  };

  const optionDeleteHandler = (index, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const renderOptions = (qIndex) => {
    return questions[qIndex].options.map((option, oIndex) => (
      <AnimatePresence key={oIndex}>
        <motion.div
          className="mt-2 flex"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
            placeholder={`Option ${oIndex + 1}`}
            className="w-full px-3 py-2 border bg-tc6 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {questions[qIndex].options.length > 1 && (
            <Button onClick={() => optionDeleteHandler(qIndex, oIndex)} className="p-2 m-2 rounded-full">
              <RxCross2 className="text-2xl" />
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    ));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      formName,
      formDes,
      questions,
      banner: selectedFile,
    };

    if (!formName) {
      alert('Form Name is required');
      return;
    } else if (questions.length === 0) {
      alert('Add at least one question');
      return;
    }

    const formData = new FormData();
    formData.append('formName', formName);
    formData.append('formDes', formDes);
    formData.append('questions', JSON.stringify(questions));
    formData.append('banner', selectedFile);

    try {
      const response = await fetch('/formController', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Submitted data:', data);
        alert('Form Submitted Successfully');
      } else {
        console.error('Error:', response.statusText);
        alert('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <motion.div
      className={`${backgroundStyle} min-h-screen flex flex-wrap justify-start md:justify-between p-4 space-y-0`}
      layout
      initial={firstReload ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Box */}
      <div className="mx-auto bg-gray-100 rounded-lg shadow-sm profile-box bg-white rounded w-full sm:max-w-sm flex-col justify-center items-center h-fit ml-auto ml-0 sm:mr-24 order-1 sm:order-2">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <Image src={avatarUrl} alt="User avatar" width={100} height={100} className="rounded-full bg-white p-1 border-2 border-gray-600" />
            </div>
            <div className="flex-grow text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{userName}</h2>
            </div>
            <div className="flex-shrink-0 mt-4 sm:mt-0">
              <Button className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white">View Dashboard</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Builder */}
      <div className="p-4 w-full sm:max-w-2xl sm:ml-12 order-2 sm:order-1">
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-tc7' : 'text-tc1'}`}>Create Your Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="formName">
              Form Name
            </label>
            <input
              type="text"
              id="formName"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Enter the name of your form"
              className="w-full px-4 py-2 border bg-tc4 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="formDes">
              Form Description
            </label>
            <textarea
              id="formDes"
              value={formDes}
              onChange={(e) => setFormDes(e.target.value)}
              placeholder="Describe your form..."
              className="w-full px-4 py-2 border bg-tc6 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Image Upload Section */}
          <ImagePreview onImageSelect={handleImageSelect} />

          {/* Dynamic Questions Section */}
          <div>
            <h2 className={`text-2xl font-bold mt-8 mb-4 ${darkMode ? 'text-tc7' : 'text-tc1'}`}>Questions</h2>
            <AnimatePresence>
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  className="mb-6 border border-gray-300 p-4 rounded-md bg-tc4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      value={question.questionName}
                      onChange={(e) => handleQuestionChange(index, 'questionName', e.target.value)}
                      placeholder="Enter the question..."
                      className="w-full px-3 py-2 border bg-tc6 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <div className="flex space-x-3">
                      <Button
                        className="p-2 bg-gray-500 hover:bg-gray-600 rounded-full"
                        onClick={() => handleDuplicateQuestion(index)}
                      >
                        <IoDuplicate className="text-xl text-white" />
                      </Button>
                      <Button
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-full"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <FaTrashAlt className="text-xl text-white" />
                      </Button>
                    </div>
                  </div>

                  {/* Question Type */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Question Type</label>
                    <select
                      value={question.questionType}
                      onChange={(e) => handleQuestionChange(index, 'questionType', e.target.value)}
                      className="w-full px-3 py-2 border bg-tc6 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      <option value="single">Single Choice</option>
                      <option value="multiple">Multiple Choice</option>
                      <option value="text">Text</option>
                      <option value="document">Document Upload</option>
                    </select>
                  </div>

                  {/* Options for Single/Multiple Choice */}
                  {(question.questionType === 'single' || question.questionType === 'multiple') && (
                    <div>
                      <h3 className="text-lg font-bold mb-2">Options</h3>
                      {renderOptions(index)}
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-4" onClick={() => handleAddOption(index)}>
                        <IoMdAddCircleOutline className="mr-2" /> Add Option
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button type="submit" className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2">
            Submit Form
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default FormBuilder;
