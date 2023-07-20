import React, { useState } from 'react';

const MessageField = () => {
  const [Message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the Message data, like sending it to a server
    console.log(Message);
    setMessage('');
  };

  return (
    <div class="absolute bottom-1 justify-center">
        <textarea
            className="focus:h-[100px] text-sm transition-all resize-none text-center rounded font-mono p-2 bg-white text-black w-[350px] h-[38px]"
            placeholder='What is your message?'
        >
        </textarea>
        <button 
            class="absolute bottom-4 right-2 text-matrix hover:text-green-500" 
            type="submit"
        >
            {'>'}
        </button>
    </div>
  );
};

export default MessageField;
