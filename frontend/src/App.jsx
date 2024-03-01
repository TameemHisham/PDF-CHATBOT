import React, { useState } from 'react';
import "/frontend/src/index.css"

import ChatBot from './ChatBot';
function App() {
  const [username, setUsername] = useState('');
  const [open, setOpen] = useState(true);
  const handleNameSubmit = (e) => {
    e.preventDefault();
    // Ensure that the username is not empty before submitting
    if (username.trim() !== '') {
      // Continue with your logic here, such as sending the username to the server
      // For simplicity, let's just log the username for now
      console.log("Username submitted:", username);
      setOpen(false)
    } else {
      // Handle case where username is empty
      console.error("Username cannot be empty!");
    }
  };

  return (
    <div className='mega-container'>
      <div className='project-intro'>
      <h1>React & Flask PDF Chatbot </h1>
			<h2>Welcome, {username}!</h2>

      </div>
      {open && <form className="form-username"onSubmit={handleNameSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" /><br /><br />
        <button type="submit">Submit</button>
      </form>}
      {/* Render ChatBot component only if username is submitted */}
      {username && !open ?  
        <ChatBot username={username} /> : ""
      }
    </div>
  );
}

export default App;
