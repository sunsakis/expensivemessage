import Head from 'next/head'
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Message from '../components/message.js';
import { useSwipeable } from 'react-swipeable';
import ABI from '../contract/ABI.js';

export default function Archive({ names, imgHashes, newestPrice, newestCounter, messages, prices, settings }) {
  const [style, setStyle] = useState({});
  const [message, setMessage] = useState(messages[0]);
  const [counter, setCounter] = useState(0);
  const [msgPrices, setPrices] = useState(prices[0]);
  const [imgHash, setImgHash] = useState(imgHashes[0]);
  const [name, setName] = useState(names[0]);
  const [windowSize, setWindowSize] = useState({});


  // Step 2: Modify getImgURLFromHash to handle undefined inputs
function getImgURLFromHash(imgHash) {
  if (imgHash === '' || imgHash === undefined) {
    return '/defaultMessage.png';
  }
  // Existing logic to generate the image URL from the hash
  return imgHash.replace('ipfs://', 'https://ipfs.io/ipfs/');
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

  const handlers = useSwipeable({
    onSwipedLeft: () => showPreviousMessage(),
    onSwipedRight: () => showNextMessage(),
    delta: { right: 100, left: 100 },
  });

  const showNextMessage = () => {
    setCounter(prevCounter => {
        if (prevCounter <= 0) return prevCounter;
        const newCounter = prevCounter - 1;
        const newImgHash = imgHashes[newCounter];
        setMessage(messages[newCounter]);
        setPrices(prices[newCounter]);
        setImgHash(imgHashes[newCounter]);
        setName(names[newCounter]);
        console.log(newCounter);
        if (newImgHash !== undefined || newImgHash !== '') {
            const newImgURL = getImgURLFromHash(newImgHash);
            updateStyle(newImgURL);
        } else {
            console.log('imgHash is undefined');
        }
        return newCounter; 
    });
  };
  
  const showPreviousMessage = () => {
    setCounter(prevCounter => {
      if (prevCounter >= newestCounter - 1) return prevCounter;
      const newCounter = prevCounter + 1;
      const newImgHash = imgHashes[newCounter];
      setMessage(messages[newCounter]);
      setPrices(prices[newCounter]);
      setImgHash(imgHashes[newCounter]);
      setName(names[newCounter]);
      console.log(newCounter);
      console.log(prices[newCounter]);
      if (newImgHash !== undefined || newImgHash !== '') {
        const newImgURL = getImgURLFromHash(newImgHash);
        updateStyle(newImgURL);
      } else {
        console.log('imgHash is undefined');
      }
      return newCounter; // Return the updated counter value
    });
  };

  return (
    <>
      <Head>
        <title>Archives | MXM</title>
        <meta name="description" content="An archive of all of the previously most expensive messages." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Archives | MXM" />
        <meta property="og:description" content="An archive of all of the previously most expensive messages." />
        <meta property="og:url" content="mxm.social" /> 
        <meta property="og:site_name" content="MXM" />
        <meta name="twitter:creator" content="@MostXMessage" /> 
      </Head>
      <main>
        <div style={style} {...handlers} className="w-full relative">
          <div className="min-h-screen flex-col flex"> {/* Adjusted for flexbox layout */}
            <Header />
            <div className="flex flex-grow justify-center items-center">
                  <Message text={message} name={name} />
            </div>
            <Footer settings={settings} msgPrices={msgPrices} price={newestPrice} text={"This"} />
          </div>
          <div className="w-full absolute top-28 items-center flex left-0 right-0 justify-between px-10 sm:px-20 md:px-32 lg:px-56 xl:px-96">
            <div className="justify-start">
              {counter !== 0 && (
              <button className="text-3xl" onClick={showNextMessage}>
                ←
              </button>
              )}
            </div>
            <div className="justify-end">
              {message !== "Who dares to profit from owning the first MXM?" && (
              <button className="text-3xl" onClick={showPreviousMessage}>
                →
              </button>
              )}
            </div>
        </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {

  const settings = {
    apiKey: process.env.ALCHEMY_API,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);
  const ethersProvider = await alchemy.config.getProvider();
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);
  const newMessageCall = await contract.readMessage();
  const newestCounter = newMessageCall[1].toNumber();
  const newestPrice = await contract.getPrice();
  const formatPrice = ethers.utils.formatEther(newestPrice);
  console.log(`newest counter is ${newestCounter}`);

  let messages = [];
  let prices = [];
  let imgHashes = [];
  let names = [];
  
  for (let i = newestCounter - 1; i >= 0; i--) {
    // Fetch all data in parallel
    const [message, price, imgHash, name] = await Promise.all([
      contract.getMessages(i),
      contract.getPrices(i),
      contract.getImgHashes(i),
      contract.getNames(i),
    ]);
    console.log(`message nr.${i} by ${name} is ${message} #: ${imgHash}`);
    messages.push(message);
    prices.push(ethers.utils.formatEther(price));
    imgHashes.push(imgHash);
    names.push(name);
  }

  return {
    props: {
      newestPrice: formatPrice,
      newestCounter: newestCounter,
      messages: messages,
      prices: prices,
      imgHashes: imgHashes,
      names: names,
      settings: settings,
    },
    //revalidate: 1,
  };
}
  