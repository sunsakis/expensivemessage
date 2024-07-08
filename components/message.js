import Link from "next/link";
import React from "react";

const Message = ({ text, showXLink, price }) => {
  if (!text || typeof text !== "string") {
    return null; // Return early if the text prop is invalid
  }

  let xText = "https://twitter.com/intent/tweet?text=" + text + " Ξ You just read the world's most expensive message. Ξ" + price / 2 + " @ xms.ge";

  return (
    <div className="flex justify-center items-center min-h-screen">
      {showXLink && ( // Only show the X Link if showXLink is true
        <span className="text-matrix mr-3 text-xl hover:text-green-500">
          <Link
            className="twitter-share-button"
            href={xText}
            data-via="codeisthelaw"
            data-hashtags="expensive, message"
            dnt="true"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            X
          </Link>{" "}
        </span>
      )}
      <div className="max-w-3xl p-4 text-center">
        <h1 className="text-5xl font-bold">
          <i>{text}</i>
        </h1>
      </div>
    </div>
  );
};

export default Message;
