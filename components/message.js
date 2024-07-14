import React from "react";
import { useState, useEffect } from "react";

const Message = ({ text }) => {
  if (!text || typeof text !== "string") {
    return null; // Return early if the text prop is invalid
  }
  
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001')
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          setName(data.name)
        }
      });
  }, []);

  const handleClick = () => {
    const newName = prompt('Enter the name attributed to the new message', name);
    if (newName) {
      fetch('http://localhost:3001/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setName(newName);
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-3xl p-4 text-center">
        <h1 className="text-5xl font-bold drop-shadow-xl">
          <i>{text}</i>
        </h1>
        <br/><br/>
        <p className="text-xl font-semibold drop-shadow-xl" onClick={handleClick}>
          - {name}
        </p>
      </div>
    </div>
  );
};

export default Message;
