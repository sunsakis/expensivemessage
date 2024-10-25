import Head from 'next/head'
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import Footer from '../components/footer.js';
import FooterTelegram from '@/components/footerTelegram.js';
import FooterNew from '@/components/footerNew.js';
import Header from '../components/header.js';
import Message from '../components/message.js';
import ABI from '../contract/ABI.js';

export default function Home({ imgHash, price, message, settings, messenger }) {
  const [style, setStyle] = useState({});
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

  return (
    <>
      <Head>
        <title>Expensive Message</title>
        <meta name="description" content="Free speech for profit." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Expensive Message" />
        <meta property="og:description" content="Expensive Message - free speech for profit." />
        <meta property="og:url" content="https://www.expensivemessage.com" /> 
        <meta property="og:site_name" content="Expensive Message" />
      </Head>
      <Header />
      <main>
        <div style={style} className="w-full">
          <div className="min-h-screen flex-col flex">
            <div className="flex flex-grow justify-center items-center">
              <Message text={message} messenger={messenger} /> 
            </div>
            <Footer settings={settings} msgPrices={price} text={""} />
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const settings = {
      apiKey: process.env.ALCHEMY_API,
      network: Network.BASE_MAINNET,
    };

    const alchemy = new Alchemy(settings);
    const ethersProvider = new ethers.providers.JsonRpcProvider("https://base-mainnet.g.alchemy.com/v2/tf5FyYe77CL61JNMkGP_uCktVih38A6J");
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);

    let newestMessage, newestCounter, newestPrice, newestImgHash, newestMessenger;

    try {
      const newMessageCall = await contract.readMessage();
      newestMessage = newMessageCall[0].toString();
      newestCounter = newMessageCall[1].toNumber();
      console.log("newestCounter:", newestCounter);
    } catch (error) {
      console.error("Error calling readMessage:", error);
      newestMessage = "Error reading message";
      newestCounter = 0;
    }

    try {
      newestPrice = await contract.getPrice();
    } catch (error) {
      console.error("Error calling getPrice:", error);
      newestPrice = ethers.BigNumber.from(0);
    }

    const formatPrice = ethers.utils.formatEther(newestPrice);

    try {
      newestImgHash = await contract.getImgHashes(newestCounter - 1);
      console.log("newestImgHash:", newestImgHash);
    } catch (error) {
      console.error("Error calling getImgHashes:", error);
      newestImgHash = "";
    }

    try {
      newestMessenger = await contract.getMessengers(newestCounter - 1);
      console.log("newestMessenger:", newestMessenger);
    } catch (error) {
      console.error("Error calling getMessengers:", error);
      newestMessenger = ethers.constants.AddressZero;
    }

    return {
      props: {
        price: formatPrice,
        message: newestMessage,
        imgHash: newestImgHash,
        messenger: newestMessenger,
        networkName: "BASE_MAINNET", // Pass the network name as a string if needed
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to fetch data"
      }
    };
  }
}
  