import React, { useState } from 'react';
import ProgressBar from "./progress";

const UploadPDF = ({ username }) => {
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      console.error('No file selected');
      return;
    }
    setSending(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);

    fetch('http://localhost:5000/upload-and-train', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setSending(false);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setSending(false);
      });
  };

  return (
    <div className="pdf_box">
      <div className='pdf-input-container'>
        <h1>Upload PDF</h1>
        <label htmlFor="pdf-input">Choose PDF</label>
        <div className="file-upload-container">
          <input type="file" id="file-input" className="pdf-input" onChange={handleFileChange} accept=".pdf" />
          <label htmlFor="file-input" className="file-upload-label">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 logo">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
            </svg>
          </label>
        </div>
        {sending && <ProgressBar percent={50} />}
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPDF;
