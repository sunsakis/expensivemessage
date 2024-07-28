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

const ABI = [
  "event MessageChanged(uint256 newPrice, address messenger, , uint256 msgCounter)",
  "function setMessage(string memory newMessage, uint256 priceIncrease) external payable",
  "function readMessage() public view returns (string memory, uint256)",
  "function getMessages(uint256 _msgCounter) public view returns (string memory)",
  "function getPrices(uint256 _msgCounter) public view returns (uint256)",
  "function getImgHashes(uint _msgCounter) public view returns (string memory)",
  "function getPrice() public view returns (uint256)",
  "function withdraw() external",
];

const myChain = sepolia;

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_ID,
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.trustwallet.app"),
];

export default function Home({ imgHashes, newestPrice, newestCounter, messages, newestMessage, prices }) {
  const [style, setStyle] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState(newestMessage);
  const [counter, setCounter] = useState(0);
  const [msgPrices, setPrices] = useState(newestPrice);
  const [imgHash, setImgHash] = useState(imgHashes[0]);


    // Step 2: Modify getImgURLFromHash to handle undefined inputs
  function getImgURLFromHash(imgHash) {
    if (imgHash === '' || imgHash === undefined) {
      // Return a default image URL or handle the error as appropriate
      // return 'defaultImageUrl';
      console.log('imgHash is undefined');
      return;
    }
    // Existing logic to generate the image URL from the hash
    return imgHash.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  const updateStyle = (backgroundImageUrl) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    // Use the smaller of the viewport dimensions to influence the spotlight size, ensuring it works for both landscape and portrait
    let spotlightSize = Math.min(viewportWidth, viewportHeight);
  
    // Cap the spotlight size at 1500px
    spotlightSize = Math.min(spotlightSize, 1000);
  
    // Calculate the first and second gradients
    // The first gradient is the transparent center of the spotlight
    // The second gradient begins the dimming effect, so it should be slightly larger than the first
    const firstGradient = `${spotlightSize / 2.8}px`; // Half the size for a circular gradient
    const secondGradient = `${spotlightSize / 1.8}px`; // Full size for the dimming effect to start
    
    setStyle({
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), radial-gradient(circle at center, transparent ${firstGradient}, black ${secondGradient}), url(${backgroundImageUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
    });
  };

  useEffect(() => {

    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const networkId = await provider.getNetwork();
        if (accounts.length > 0) {
          setIsConnected(networkId.chainId === myChain.id);
        }
        else {
          setIsConnected(false);
        }
      }
    };
    const updateBackground = async () => {
      const newImgURL = getImgURLFromHash(imgHashes[0]);
      updateStyle(newImgURL);
    };

    updateBackground(); 

    const newImgURL = getImgURLFromHash(imgHash);
    window.addEventListener('resize', updateStyle(newImgURL));
    window.ethereum?.on('chainChanged', checkConnection);
    window.ethereum?.on('accountsChanged', checkConnection);

    checkConnection();


    // Cleanup
    return () => {
      window.removeEventListener('resize', updateStyle(newImgURL));
      window.ethereum?.removeListener('chainChanged', checkConnection);
      window.ethereum?.removeListener('accountsChanged', checkConnection);
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
      if (newImgHash !== undefined || newImgHash !== '') {
        const newImgURL = getImgURLFromHash(newImgHash);
        updateStyle(newImgURL);
      } else {
        console.log('imgHash is undefined');
      }
      console.log(newImgHash); 
      return newCounter; 
    });
  };
  
  const showPreviousMessage = () => {
    setCounter(prevCounter => {
      if (prevCounter >= newestCounter) return prevCounter;
      const newCounter = prevCounter + 1;
      const newImgHash = imgHashes[newCounter];
      setMessage(messages[newCounter]);
      setPrices(prices[newCounter]);
      setImgHash(imgHashes[newCounter]);
      if (newImgHash !== undefined || newImgHash !== '') {
        const newImgURL = getImgURLFromHash(newImgHash);
        updateStyle(newImgURL);
      } else {
        console.log('imgHash is undefined');
      }
      console.log(newImgHash); // Log newCounter
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
        <title>MXM - Most eXpensive Message</title>
        <meta name="description" content="Free speech rewarded." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="MXM - Most eXpensive Message" />
        <meta property="og:description" content="Free speech rewarded." />
        <meta property="og:url" content="mxm.social" /> 
        <meta property="og:site_name" content="MXM" />
        <meta name="twitter:creator" content="@MostXMessage" /> 
      </Head>
      <main>
        <div style={style} {...handlers}>
            <Header isConnected={isConnected} client={client} wallets={wallets} counter={counter} showNext={showNextMessage} reset={reset}/>
            <Message text={message} /> 
            <Footer price={newestPrice} msgPrices={msgPrices} isConnected={isConnected} client={client} wallets={wallets} mycChain={myChain} newestCounter={newestCounter} counter={counter} showPrevious={showPreviousMessage} genesisMessage={message}/>
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
  
  for (let i = newestCounter - 1; i >= 0; i--) {
    const message = await contract.getMessages(i);
    const price = await contract.getPrices(i);
    const imgHash = await contract.getImgHashes(i);
    console.log(`message nr.${i} is ${message} IMGHASH: ${imgHash}`);
    messages.push(message);
    prices.push(ethers.utils.formatEther(price));
    imgHashes.push(imgHash);
  }

  return {
    props: {
      newestPrice: formatPrice,
      newestCounter: newestCounter,
      messages: messages,
      newestMessage: newestMessage,
      prices: prices,
      imgHashes: imgHashes,
    },
    //revalidate: 1,
  };
}
  