import Image from 'next/image';
import React, { useState } from 'react';

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
        <Image
          src={selectedImage}
          alt="Selected"
          width={256}
          height={144}
          className="object-cover rounded m-4"
        />
      )}
    </div>
  );
};

export default ImagePreview;
