const CenteredParagraph = ({ text }) => {
  // const [showFullText, setShowFullText] = useState(false);

  // const toggleText = () => {
  //   setShowFullText(!showFullText);
  // };

  if (!text || typeof text !== 'string') {
    return null; // Return early if the text prop is invalid
  }

  // const maxLength = 180;
  // const shouldShowButton = text.length > maxLength;

  // const truncateText = (text, length) => {
  //   if (text.length <= length) return text;
  //   const lastSpaceIndex = text.lastIndexOf(' ', length);
  //   return `${text.slice(0, lastSpaceIndex)}${shouldShowButton ? '...' : ''}`;
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-[500px] p-4 border rounded-lg">
        <p className="whitespace-pre-line break-words text-[1rem] font-mono max-h-[420px] overflow-y-auto"
        >
          <i>
          {text}
          </i>
        </p>
      </div>
    </div>
  );
};

export default CenteredParagraph;
