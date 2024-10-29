import React, { useState, useRef } from 'react';

const ImagePreview = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onImageSelect(file); 
      };
      reader.readAsDataURL(file);
    }
  };




  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4  text-black rounded-md"
      />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          className="w-64 h-36 object-cover rounded m-4"
        />
      )}
    </div>
  );
};

export default ImagePreview;
export { ImagePreview };