import React, { useState } from "react";

const Message = ({ text, messenger }) => {
  const [copied, setCopied] = useState(false);

  if (!text || typeof text !== "string") {
    return null; // Return early if the text prop is invalid
  }

  // Define the text shadow style
  const textShadowStyle = {
    textShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Y: 8px, blur: 16px, color: #000000 at 30% opacity
  };

  // Function to shorten the Ethereum address
  const shortenAddress = (address) => {
    if (address.length !== 42) return address; // Not a standard ETH address, might be ENS
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Function to copy address to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(messenger);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex justify-center items-center" style={textShadowStyle}>
      <div className="max-w-md lg:max-w-xl p-4 text-center mx-auto w-full px-4">
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <h1 className="text-2xl sm:text-3xl font-semibold drop-shadow-xl">
          <b><i>{text}</i></b>
        </h1><br/>
        <p className="text-base drop-shadow-xl text-gray-50 font-medium">
          <button 
            onClick={copyToClipboard} 
            className="cursor-pointer hover:underline focus:outline-none"
            title="Click to copy address"
          >
            <span className="hidden sm:inline">{messenger}</span>
            <span className="sm:hidden">{shortenAddress(messenger)}</span>
            {copied && <span className="ml-2 text-green-400">Copied!</span>}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Message;