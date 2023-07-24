import { useState } from 'react';
import Link from 'next/link';

const CenteredParagraph = ({ text }) => {
  const [showFullText, setShowFullText] = useState(false);

  const id = 1;

  // const toggleText = () => {
  //   setShowFullText(!showFullText);
  // };

  if (!text || typeof text !== 'string') {
    return null; // Return early if the text prop is invalid
  }

  const maxLength = 280;
  const shouldShowButton = text.length > maxLength;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xs w-[500px] p-4 border border-zinc-700 rounded-lg">
        <p className="whitespace-pre-line break-words text-center text-[0.8rem] font-mono">
          <i>
          {showFullText ? text : text.slice(0, maxLength) + (shouldShowButton ? '...' : '')}
          </i>
        </p>
        {shouldShowButton && (
          <Link href={`/nr/${id}`}>
          <button
            className="mt-2 text-blue-500 underline"
            //onClick={toggleText}
          >
            {showFullText ? 'Read less' : 'Read more'}
          </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CenteredParagraph;
