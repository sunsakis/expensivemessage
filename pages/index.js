import Head from 'next/head'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Message from '../components/message.js';
import { useSwipeable } from 'react-swipeable';
import oldABI from '../contract/oldABI.js';
import Image from 'next/image';
import Link from 'next/link'

export default function Hamsterverse({ names = [], imgHashes = [], messages = [], prices = [], newestCounter = 0 }) {
  const [style, setStyle] = useState({
    backgroundImage: '',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  });
  const [message, setMessage] = useState(messages[0]);
  const [imgHash, setImgHash] = useState(imgHashes[0]);
  const [name, setName] = useState(names[0]);
  const [price, setPrices] = useState(prices[0]);
  const [windowSize, setWindowSize] = useState({});
  const [currentIndex, setCurrentIndex] = useState(newestCounter - 1);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allMessages, setAllMessages] = useState(messages);

  useEffect(() => {
    const updateBackground = async () => {
      const newImgURL = getImgURLFromHash(imgHash);
      updateStyle(newImgURL);
    };
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateBackground();
    };
  
    updateBackground(); 
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imgHash]);

  function getImgURLFromHash(imgHash) {
    if (imgHash === '' || imgHash === undefined) {
      return '/defaultMessage.png';
    }
    return imgHash.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
  }

  const updateStyle = (backgroundImageUrl) => {
    const viewportWidth = window?.innerWidth || 1024;
    const viewportHeight = window?.innerHeight || 768;
    const minSpotlightSize = 200;
    let spotlightSize = Math.max(Math.min(viewportWidth, viewportHeight) * 0.3, minSpotlightSize);
    const firstGradient = `${spotlightSize * 0.5}px`;
    const secondGradient = `${spotlightSize}px`;
    
    setStyle({
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), radial-gradient(circle at center, transparent ${firstGradient}, black ${secondGradient}), url(${backgroundImageUrl})`,
      backgroundPosition: 'center',
      backgroundSize: (viewportWidth < 450) ? 'cover' : 'contain',
      backgroundRepeat: 'no-repeat'
    });
  };

  const showNextMessage = async () => {
    const newIndex = currentIndex + 1;
    if (newIndex >= newestCounter - 1) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/fetch-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ index: newestCounter - 1 }),
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        setMessage(data.message);
        setPrices(data.price);
        setImgHash(data.imgHash);
        setName(data.name);
        setCurrentIndex(newestCounter - 1);
        setCounter(0);
      } catch (error) {
        console.error("Error fetching newest message:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
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

  return (
    <>
      <Head>
        <title>Expensive Message History</title>
        <meta name="description" content="An archive of Hamsterverse's most Expensive Messages." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Archives" />
        <meta property="og:description" content="An archive of Hamsterverse's most Expensive Messages." />
        <meta property="og:url" content="https://www.expensivemessage.com" /> 
        <meta property="og:site_name" content="Expensive Message" />
      </Head>
      
      <main className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="min-h-full flex flex-col" style={style}>
            <Header />
            
            <div className="w-full relative mt-28 flex items-center justify-between px-10 sm:px-20 md:px-32 lg:px-56 xl:px-96 z-10">
              <button 
                className="text-3xl" 
                onClick={currentIndex > 0 ? showPreviousMessage : undefined}
                style={{ opacity: currentIndex > 0 ? 1 : 0.25 }}
                disabled={isLoading}
              >
                <Image 
                  src="arrowLeft.svg" 
                  alt="Arrow to the left" 
                  width={25} 
                  height={25}
                />
              </button>
              <button 
                className="text-3xl" 
                onClick={currentIndex < newestCounter - 1 ? showNextMessage : undefined}
                style={{ opacity: currentIndex < newestCounter - 1 ? 1 : 0.25 }}
                disabled={isLoading}
              >
                <Image 
                  src="arrowRight.svg" 
                  alt="Arrow to the right" 
                  width={25} 
                  height={25}
                />
              </button>
            </div>

            <div className="flex-1 flex justify-center items-center bg-black bg-opacity-20 -mt-48">
              <Message text={message} messenger={name} />
            </div>

            <div className="mt-auto">
              <div className="sm:m-5">
                <p className="text-sm text-right tracking-tight mr-9 text-gray-300">
                  This message cost
                </p>
                <p className="pb-2 text-right mr-8">
                  <b className="text-2xl">
                    {price + " "}
                    <Link 
                      href="https://app.uniswap.org/explore/tokens/base/0x11dc980faf34a1d082ae8a6a883db3a950a3c6e8"
                      className="text-green-500 hover:text-green-400 transition duration-500 ease-in-out hover:underline"
                      rel="nofollow" 
                      target="_blank"
                    >
                      RGCVII
                    </Link>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const baseProvider = new ethers.providers.JsonRpcProvider(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, oldABI, baseProvider);
    const mainnetProvider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);

    const newMessageCall = await contract.readMessage();
    const newestCounter = newMessageCall[1].toNumber();
    const newestPrice = await contract.getPrice();
    const formatPrice = ethers.utils.formatEther(newestPrice);

    let message = '', price = '0', imgHash = '', resolvedName = '';
    
    if (newestCounter > 0) {
      const i = newestCounter - 1;
      const [msg, prc, img, messenger] = await Promise.all([
        contract.getMessages(i),
        contract.getPrices(i),
        contract.getImgHashes(i),
        contract.getMessengers(i),
      ]);

      message = msg;
      price = prc;
      imgHash = img;
      resolvedName = messenger;

      try {
        const ensName = await mainnetProvider.lookupAddress(messenger);
        if (ensName) {
          resolvedName = ensName;
        }
      } catch (error) {
        console.error("Error resolving ENS:", error);
      }
    }

    return {
      props: {
        newestPrice: formatPrice,
        newestCounter: newestCounter,
        messages: message ? [message] : [],
        prices: price ? [parseFloat(ethers.utils.formatEther(price)).toString()] : [],
        imgHashes: imgHash ? [imgHash] : [],
        names: resolvedName ? [resolvedName] : [],
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        newestPrice: '0',
        newestCounter: 0,
        messages: [],
        prices: [],
        imgHashes: [],
        names: [],
      },
    };
  }
}