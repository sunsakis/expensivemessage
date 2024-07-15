import React from "react";
import { useState, useEffect } from "react";

const Message = ({ text }) => {
  if (!text || typeof text !== "string") {
    return null; // Return early if the text prop is invalid
  }
  
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER)
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
      fetch(process.env.NEXT_PUBLIC_SERVER + '/name', {
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
      <div className="max-w-3xl p-4 text-center mx-auto w-full px-4">
        <h1 className="text-2xl font-bold drop-shadow-xl">
          <b>{text}</b>
        </h1>
        <br/><br/>
        <p className="text-sm drop-shadow-xl text-gray-50" onClick={handleClick}>
          {name}
        </p>
      </div>
    </div>
  );
};

export default Message;
