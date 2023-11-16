import Link from "next/link";
import React from "react";

const Message = ({ text, showXLink, price }) => {
  if (!text || typeof text !== "string") {
    return null; // Return early if the text prop is invalid
  }

  let xText = "https://twitter.com/intent/tweet?text=" + text + " ΞYou just read the world's most expensive message. Ξ" + price / 2 + " at xms.ge";

  return (
    <div className="flex justify-center items-center h-screen">
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
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-[500px] p-4 border rounded-lg">
        <p className="whitespace-pre-line break-words text-[1rem] font-mono max-h-[420px] overflow-y-auto">
          <i>{text}</i>
        </p>
      </div>
    </div>
  );
};

export default Message;
