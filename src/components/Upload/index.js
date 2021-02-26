import React, { useState } from 'react'

import Button from '../Button';
import './Upload.scss'

const Upload = ({ value, callback }) => {
  const [preview, setPreview] = useState('')
  const [active, setActive] = useState(false)

  const handleEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(true)
  };

  const handleOver = e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(true)
  };

  const handleUpload = e => {
    e.preventDefault();
    e.stopPropagation();
    const [file] = e.target.files || e.dataTransfer.files;

    // for image preview
    const image = URL.createObjectURL(file);
    setPreview(image)
    setActive(false)

    uploadFile(file)
  };

  const handleLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false)
    console.log("leave!");
  };

  function uploadFile(file) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      const fileRes = btoa(reader.result)
      // passing data to parent
      callback(`data:image/jpg;base64,${fileRes}`);
    };

    reader.onerror = () => {
      console.log('There is a problem while uploading...');
    };
  }

  return (
    <div
      className={`upload${preview.length === 0 ? (active ? ' is-active' : '') : ''}`}
      onDragEnter={(e) => handleEnter(e)}
      onDragLeave={(e) => handleLeave(e)}
      onDragOver={(e) => handleOver(e)}
      onDrop={(e) => handleUpload(e)}
      style={{backgroundImage: `url(${preview ? preview : value})`}}>
      <p className="upload-text">Drag and drop image here</p>
      <div className="upload-button">
        <input
          className="upload-file"
          type="file"
          accept="image/*"
          onChange={(e) => handleUpload(e)} />
        <Button label="Upload Image" />
      </div>
    </div>
  )
};

export default Upload;
