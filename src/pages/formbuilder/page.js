import React, { useState, useEffect } from 'react';
import "../../app/globals.css";
import { RxCross2 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";
import { IoDuplicate } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button"
import ImagePreview from '@/components/ImagePreview';
import Image from 'next/image'

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
  const avatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${seed}`

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
        options: [...questions[index].options] };
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
      <AnimatePresence>
      <motion.div key={oIndex} className="mt-2 flex"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}>
        <input
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
          placeholder={`Option ${oIndex + 1}`}
          className="w-full px-3 py-2 border bg-tc6 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <div>
          {questions[qIndex].options.length > 1 ? (
            <Button
              onClick={() => optionDeleteHandler(qIndex, oIndex)}
              className="p-2 m-2 rounded-full"
            >
              <RxCross2 className="text-2xl" />
            </Button>
          ) : null}
        </div>
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
  
    console.log(form);

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
    className={` ${backgroundStyle} min-h-screen flex flex-wrap justify-start md:justify-between p-4 space-y-0`}
    layout
    initial={firstReload ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
    animate={{ opacity: 1, y: 0 }}  
    transition={{ duration: 0.5 }}>

    {/* Profile Box */}
    <div className="mx-auto bg-gray-100 rounded-lg shadow-sm profile-box bg-white rounded w-full sm:max-w-sm flex-col justify-center items-center h-fit ml-auto ml-0 sm:mr-24 order-1 sm:order-2 ">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <Image
              src={avatarUrl}
              alt="User avatar"
              width={100}
              height={100}
              className="rounded-full bg-white p-1 border-2 border-gray-600"
            />
          </div>
          <div className='flex flex-col m-4'>

          <div className="flex-grow text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{userName}</h2>
            
          </div>
          <div className="flex-shrink-0 mt-4 sm:mt-0">
            <Button className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white">
              View Dashboard
            </Button>
          </div>
          </div>
        </div>
      </div>
    </div>

    {/* Form Builder */}
    <div className='p-4 w-full sm:max-w-2xl sm:ml-12 order-2 sm:order-1'>
      <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-tc7' : 'text-tc1'}`}>Create Form</h1>
      <input
        required
        type="text"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        placeholder="Form Name"
        className="w-full mb-6 px-4 py-2 border bg-tc4 border-gray-300 rounded-md text-lg focus:outline-none focus:ring focus:ring-blue-300 font-bold"
        />
      <textarea
        type="text"
        value={formDes}
        onChange={(e) => setFormDes(e.target.value)}
        placeholder="Description (optional)"
        className="w-full mb-6 px-4 py-1 border bg-tc4 border-gray-300 rounded-md text-lg focus:outline-none focus:ring focus:ring-blue-300 "
        />
        <div>
          <h3 className='font-bold'>Upload Form Banner</h3>
          <ImagePreview onImageSelect={handleImageSelect}/>
        </div>

      <AnimatePresence>
        {questions.length === 0 ?(<></>):(

          <div className='bg-white p-2 sm:p-6 rounded-lg'>

        {questions.map((question, qIndex) => (
          <motion.div
          key={question.id}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          layout
          className="mb-6 p-2  sm:p-6 sm:border border-gray-200 shadow-lg rounded-md shadow-sm"
          >
            <h2 className="text-m font-bold mb-4">Q.{qIndex + 1}</h2>
            <input
              type="text"
              value={question.questionName}
              onChange={(e) => handleQuestionChange(qIndex, 'questionName', e.target.value)}
              placeholder="Question Name"
              className="w-full mb-4 px-4 py-2 border bg-tc4 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

            <select
              value={question.questionType}
              onChange={(e) => handleQuestionChange(qIndex, 'questionType', e.target.value)}
              className="w-full mb-4 px-4 py-2 border bg-tc4 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
              <option value="single">Single Choice</option>
              <option value="multiple">Multiple Choice</option>
              <option value="text">Text Answer</option>
              <option value="email">Email</option>
              <option value="phoneNum">Contact Number</option>
              <option value="Document">Document Upload</option>
            </select>

            {question.questionType === 'multiple' ? (
              <div>
                <input
                  type='number'
                  min={1}
                  placeholder='Enter the number of allowed choices'
                  className='w-full px-3 py-2 border bg-tc4 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  />
              </div>
            ) : null}

            {question.questionType === 'single' || question.questionType === 'multiple' ? (
              <div>
                {renderOptions(qIndex)}
                <Button
                  onClick={() => handleAddOption(qIndex)}
                  className="mt-3 px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600"
                  >
                  Add Option
                </Button>
              </div>
            ) : null}

              {question.questionType === 'Document' ? (
                <div className="ml-1">
                      <label htmlFor="docSize">Maximum file size: </label>
                      <select
                        name="size"
                        id="docSize"
                        className="mb-4 px-4 py-2 border bg-tc4 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        >
                        <option value="1">1 MB</option>
                        <option value="10">10 MB</option>
                        <option value="100">100 MB</option>
                      </select>
                    </div>
                ) : null}
            <div className='flex justify-between'>

              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => handleQuestionChange(qIndex, 'required', e.target.checked)}
                  className="mr-2 w-6 h-6 text-blue-600 bg-gray-900 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
                  />
                <label className="text-sm">Required</label>
              </div>

              <div className='flex justify-end flex-wrap'>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleDuplicateQuestion(qIndex)}
                    className="mr-2 px-4 py-2 bg-tc4 rounded-md hover:fill"
                    >
                    <IoDuplicate />
                  </Button>
                </div>

                <div className="mt-4">
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="mr-2 px-4 py-2 text-white rounded-md hover:bg-red-800"
                    alt="Delete Question"
                    >
                    <FaTrashAlt />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}
      </AnimatePresence>

      <div className="flex gap-4 mt-3 w-max">
        <Button
          
          onClick={handleAddQuestion}
          className="px-4 py-2 h-10 bg-tc3 text-white rounded-md hover:bg-gray-400 border-2 border-tc1"
          >
          <IoMdAddCircleOutline className="w-7 h-7 mr-1 "/>Add Question
        </Button>
        <Button className="px-4 py-2 h-10 bg-tc1 text-white rounded-md hover:bg-gray-600"
        variant="secondary" onClick={handleSubmit}>
          Save or Upload
        </Button>
      </div>
    </div>
  </motion.div>
  );
};

export default FormBuilder;
