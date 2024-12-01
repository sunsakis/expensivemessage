import Head from 'next/head'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Message from '../components/message.js';
import { useSwipeable } from 'react-swipeable';
import ABI from '../contract/ABI.js';
import Image from 'next/image.js';

export default function Hamsterverse({ names, imgHashes, newestPrice, newestCounter, messages, prices }) {
  const [style, setStyle] = useState({});
  const [message, setMessage] = useState(messages[0]);
  const [counter, setCounter] = useState(0);
  const [msgPrices, setPrices] = useState(prices[0]);
  const [imgHash, setImgHash] = useState(imgHashes[0]);
  const [name, setName] = useState(names[0]);
  const [windowSize, setWindowSize] = useState({});
  const [allMessages, setAllMessages] = useState(messages);
  const [allPrices, setAllPrices] = useState(prices);
  const [allImgHashes, setAllImgHashes] = useState(imgHashes);
  const [allNames, setAllNames] = useState(names);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(newestCounter - 2);

  useEffect(() => {
    const loadMoreMessages = async () => {
      if (allMessages.length >= newestCounter - 1) return;
      
      setIsLoading(true);
      console.log("Loading more messages. Current length:", allMessages.length, "Newest counter:", newestCounter);
      const newMessages = await fetchMoreMessages(allMessages.length, newestCounter);
      
      setAllMessages(prev => [...prev, ...newMessages.messages]);
      setAllPrices(prev => [...prev, ...newMessages.prices]);
      setAllImgHashes(prev => [...prev, ...newMessages.imgHashes]);
      setAllNames(prev => [...prev, ...newMessages.names]);
      setIsLoading(false);
      console.log("Finished loading messages. New length:", allMessages.length + newMessages.messages.length);
    };
  
    loadMoreMessages();
  }, [allMessages.length, newestCounter]); // Add dependencies here

  useEffect(() => {
    const updateBackground = async () => {
      const newImgURL = getImgURLFromHash(imgHash);
      updateStyle(newImgURL);
    };
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
  
    updateBackground(); 
  
    const newImgURL = getImgURLFromHash(imgHash);
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imgHash, windowSize]);

  useEffect(() => {
    console.log("State updated - Counter:", counter, "AllMessages length:", allMessages.length);
  }, [counter, allMessages.length]);
  
  const handlers = useSwipeable({
      onSwipedLeft: () => showPreviousMessage(),
      onSwipedRight: () => showNextMessage(),
      delta: { right: 100, left: 100 },
    });


  // Step 2: Modify getImgURLFromHash to handle undefined inputs
function getImgURLFromHash(imgHash) {
  if (imgHash === '' || imgHash === undefined) {
    return '/defaultMessage.png';
  }
  // Existing logic to generate the image URL from the hash
  return imgHash.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
}

const updateStyle = (backgroundImageUrl) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Define a minimum size for the spotlight
  const minSpotlightSize = 200; // Example minimum size

  // Use the smaller of the viewport dimensions to influence the spotlight size
  // Ensure the spotlight size does not go below the minimum size
  let spotlightSize = Math.max(Math.min(viewportWidth, viewportHeight) * 0.3, minSpotlightSize);

  // Calculate the first and second gradients
  // The first gradient is the transparent center of the spotlight
  // The second gradient begins the dimming effect, so it should be slightly larger than the first
  const firstGradient = `${spotlightSize * 0.5}px`; // Half the size for a circular gradient
  const secondGradient = `${spotlightSize}px`; // Full size for the dimming effect to start
  
  setStyle({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), radial-gradient(circle at center, transparent ${firstGradient}, black ${secondGradient}), url(${backgroundImageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: window.innerWidth < 450 ? 'cover' : 'contain',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
  });
};

const showNextMessage = async () => {
    const newIndex = currentIndex + 1;
    if (newIndex <= newestCounter - 2) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/fetch-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ index: newIndex }),
        });
  
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
  
        setMessage(data.message);
        setPrices(data.price);
        setImgHash(data.imgHash);
        setName(data.name);
        setCurrentIndex(newIndex);
        setCounter(prevCounter => prevCounter - 1);
      } catch (error) {
        console.error("Error fetching next message:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const showPreviousMessage = async () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/fetch-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ index: newIndex }),
        });
  
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
  
        setMessage(data.message);
        setPrices(data.price);
        setImgHash(data.imgHash);
        setName(data.name);
        setCurrentIndex(newIndex);
        setCounter(prevCounter => prevCounter + 1);
      } catch (error) {
        console.error("Error fetching previous message:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

async function fetchMoreMessages(start, end) {
    console.log("Fetching messages from", start, "to", end);
    
    try {
      const response = await fetch('/api/fetch-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start, end }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("Fetched messages:", data.messages.length);
      return data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return { messages: [], prices: [], imgHashes: [], names: [] };
    }
  }

  return (
    <>
      <Head>
        <title>Hamsterverse | Expensive Message</title>
        <meta name="description" content="An archive of Hamsterverse's most Expensive Messages." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Archives" />
        <meta property="og:description" content="An archive of Hamsterverse's most Expensive Messages." />
        <meta property="og:url" content="https://www.expensivemessage.com" /> 
        <meta property="og:site_name" content="Expensive Message" />
      </Head>
      <main>
        <div style={style} {...handlers} className="w-full relative">
          <div className="min-h-screen flex-col flex"> {/* Adjusted for flexbox layout */}
            <Header />
            <div className="flex flex-grow justify-center items-center">
                  <Message text={message} messenger={name} />
            </div>
            <Footer msgPrices={msgPrices} price={newestPrice} text={"This"} />
          </div>
          <div className="w-full absolute top-28 items-center flex left-0 right-0 justify-between px-10 sm:px-20 md:px-32 lg:px-56 xl:px-96">
            <div className="justify-start">
              <button 
                className="text-3xl" 
                onClick={counter > 0 ? showNextMessage : undefined}
                style={{ opacity: counter > 0 ? 1 : 0.25 }}
              >
                <Image 
                  src="arrowLeft.svg" 
                  alt="Arrow to the left" 
                  width={25} 
                  height={25}
                />
              </button>
            </div>
            <div className="justify-end">
              <button 
                className="text-3xl" 
                onClick={counter < allMessages.length - 1 ? showPreviousMessage : undefined}
                style={{ opacity: counter < allMessages.length - 1 ? 1 : 0.25 }}
              >
                <Image 
                  src="arrowRight.svg" 
                  alt="Arrow to the right" 
                  width={25} 
                  height={25}
                />
              </button>
            </div>
        </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const baseProvider = new ethers.providers.JsonRpcProvider(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, baseProvider);
  // Add mainnet provider for ENS resolution
  const mainnetProvider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);

 const newMessageCall = await contract.readMessage();
 const newestCounter = newMessageCall[1].toNumber();
 const newestPrice = await contract.getPrice();
 const formatPrice = ethers.utils.formatEther(newestPrice);

 const i = newestCounter - 1;
 const [message, price, imgHash, messenger] = await Promise.all([
   contract.getMessages(i),
   contract.getPrices(i),
   contract.getImgHashes(i),
   contract.getMessengers(i),
 ]);

 // Try to resolve ENS name
 let resolvedName = messenger;
 try {
   const ensName = await mainnetProvider.lookupAddress(messenger);
   if (ensName) {
     resolvedName = ensName;
   }
 } catch (error) {
   console.error("Error resolving ENS:", error);
 }

 return {
   props: {
     newestPrice: formatPrice,
     newestCounter: newestCounter,
     messages: [message],
     prices: [parseFloat(ethers.utils.formatEther(price)).toString()],
     imgHashes: [imgHash],
     names: [resolvedName],
   },
 };
}
  