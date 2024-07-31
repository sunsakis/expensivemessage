import Head from 'next/head'
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import Message from '../components/message.js';
import { sepolia } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { useSwipeable } from 'react-swipeable';
import ABI from '../contract/ABI.js';

const myChain = sepolia;

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_ID,
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.trustwallet.app"),
];

export default function Home({ names, imgHashes, newestPrice, newestCounter, messages, newestMessage, prices, settings }) {
  const [style, setStyle] = useState({});
  const [message, setMessage] = useState(newestMessage);
  const [counter, setCounter] = useState(0);
  const [msgPrices, setPrices] = useState(newestPrice);
  const [imgHash, setImgHash] = useState(imgHashes[0]);
  const [name, setName] = useState(names[0]);


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
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), radial-gradient(circle at center, transparent ${firstGradient}, black ${secondGradient}), url(${backgroundImageUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
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
      const newImgURL = getImgURLFromHash(imgHashes[0]);
      updateStyle(newImgURL);
    };
  
    updateBackground(); 

    const newImgURL = getImgURLFromHash(imgHash);
    window.addEventListener('resize', updateStyle(newImgURL));

    // Cleanup
    return () => {
      window.removeEventListener('resize', () => updateStyle(newImgURL));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handlers = useSwipeable({
    onSwipedUp: () => showPreviousMessage(),
    onSwipedDown: () => showNextMessage(),
    delta: { up: 100, down: 150 },
  });

  const showNextMessage = () => {
    setCounter(prevCounter => {
      const lastIndex = messages.length - 1;
      let newCounter;
      if (prevCounter === lastIndex) {
        newCounter = 0;
      } else {
        newCounter = prevCounter - 1;
      }
      const newImgHash = imgHashes[newCounter];
      setMessage(messages[newCounter]);
      setPrices(prices[newCounter]);
      setImgHash(imgHashes[newCounter]);
      setName(names[newCounter]);
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
      if (newImgHash !== undefined || newImgHash !== '') {
        const newImgURL = getImgURLFromHash(newImgHash);
        updateStyle(newImgURL);
      } else {
        console.log('imgHash is undefined');
      }
      return newCounter; // Return the updated counter value
    });
  };

  const reset = () => {
    if (counter !== 0) { // Check if counter is not already 0
      console.log('Resetting counter');
      setCounter(0);
      setMessage(messages[0]);
      setImgHash(imgHashes[0]);
    } else {
      console.log('Counter is already at its default state');
    }
  };

  return (
    <>
      <Head>
        <title>MXM - Most Expensive Message</title>
        <meta name="description" content="Free speech rewarded." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="MXM - Most Expensive Message" />
        <meta property="og:description" content="Free speech rewarded." />
        <meta property="og:url" content="mxm.social" /> 
        <meta property="og:site_name" content="MXM" />
        <meta name="twitter:creator" content="@MostXMessage" /> 
      </Head>
      <main>
        <div style={style} {...handlers}>
            <Header client={client} wallets={wallets} counter={counter} showNext={showNextMessage} reset={reset}/>
            <Message text={message} name={name} /> 
            <Footer settings={settings} price={newestPrice} msgPrices={msgPrices} newestCounter={newestCounter} counter={counter} showPrevious={showPreviousMessage} genesisMessage={message}/>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {

  const settings = {
    apiKey: process.env.ALCHEMY_API,
    network: Network.ETH_SEPOLIA,
  };

  const alchemy = new Alchemy(settings);
  const ethersProvider = await alchemy.config.getProvider();
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);
  const newMessageCall = await contract.readMessage();
  const newestMessage = newMessageCall[0].toString();
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
      newestMessage: newestMessage,
      prices: prices,
      imgHashes: imgHashes,
      names: names,
      settings: settings,
    },
    //revalidate: 1,
  };
}
  