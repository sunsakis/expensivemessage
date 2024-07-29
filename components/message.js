import React from "react";

const Message = ({ text, name }) => {
  if (!text || typeof text !== "string") {
    return null; // Return early if the text prop is invalid
  }

    // Define the text shadow style
    const textShadowStyle = {
      textShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Y: 8px, blur: 16px, color: #000000 at 30% opacity
    };

  return (
    <div className="flex justify-center items-center min-h-screen" style={textShadowStyle}>
      <div className="max-w-md lg:max-w-xl p-4 text-center mx-auto w-full px-4 overflow-hidden break-words">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold drop-shadow-xl">
          <b>{text}</b>
        </h1>
        <br/><br/>
        <p className="text-sm drop-shadow-xl text-gray-50 font-medium">
          {name}
        </p>
      </div>
    </div>
  );
};

export default Message;
