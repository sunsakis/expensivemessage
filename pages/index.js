import Head from 'next/head'
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Message from '../components/message.js';
import ABI from '../contract/ABI.js';

export default function Home({ name, imgHash, price, message, settings }) {
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
        <title>Most Expensive Message | MXM</title>
        <meta name="description" content="Free speech rewarded." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Most Expensive Message | MXM" />
        <meta property="og:description" content="The Most Expensive Message - free speech rewarded." />
        <meta property="og:url" content="mxm.social" /> 
        <meta property="og:site_name" content="MXM" />
        <meta name="twitter:creator" content="@MostXMessage" /> 
      </Head>
      <main>
        <div style={style} className="w-full">
          <div className="min-h-screen flex-col flex">
            <Header />
            <div className="flex flex-grow justify-center items-center">
              <Message text={message} name={name} /> 
            </div>
            <Footer settings={settings} msgPrices={price} text={"This"} />
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
  const newestMessage = newMessageCall[0].toString();
  const newestCounter = newMessageCall[1].toNumber();
  const newestPrice = await contract.getPrice();
  const formatPrice = ethers.utils.formatEther(newestPrice);
  const newestImgHash = await contract.getImgHashes(newestCounter);
  const newestName = await contract.getNames(newestCounter);
  console.log(newestImgHash)

  return {
    props: {
      price: formatPrice,
      message: newestMessage,
      settings: settings,
      imgHash: newestImgHash,
      name: newestName,
    },
    //revalidate: 1,
  };
}
  