import Head from 'next/head'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Message from '../components/message.js';
import ABI from '../contract/ABI.js';

export default function Home({ imgHash, price, message, settings, messenger }) {
  const [style, setStyle] = useState({});
  const [windowSize, setWindowSize] = useState({});

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


  function getImgURLFromHash(imgHash) {
    if (imgHash === '' || imgHash === undefined) {
      return '/defaultMessage.png';
    }
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
      backgroundSize: window.innerWidth < 450 ? 'contain' : 'contain',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      <Head>
        <title>Expensive Message</title>
        <meta name="description" content="Free speech for profit." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* OpenGraph tags */}
        <meta property="og:title" content="Expensive Message" />
        <meta property="og:description" content="Expensive Message - free speech for profit." />
        <meta property="og:url" content="https://www.expensivemessage.com" /> 
        <meta property="og:site_name" content="Expensive Message" />
        
        {/* Frame metadata tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={getImgURLFromHash(imgHash)} />
        <meta property="fc:frame:button:1" content="View Top $DEGEN" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content="https://expensivemessage.com/api/frame/image/latest" />
      </Head>
      <Header />
      <main>
        <div style={style} className="w-full">
          <div className="min-h-screen flex-col flex">
            <div className="flex flex-grow justify-center items-center bg-black bg-opacity-10">
              <Message text={message} messenger={messenger} />
            </div>
            <Footer settings={settings} msgPrices={price} text={"This"} />
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {

    // Provider for Base network
    const baseProvider = new ethers.providers.JsonRpcProvider(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_FRONTPAGE, ABI, baseProvider);

    // Provider for Ethereum mainnet (for ENS resolution)
    const mainnetProvider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);

    let newestMessage, newestCounter, newestPrice, newestImgHash, newestMessenger;

    try {
      const newMessageCall = await contract.readMessage();
      newestMessage = newMessageCall[0];
      newestMessenger = newMessageCall[1];
      newestImgHash = newMessageCall[3];
      newestPrice = newMessageCall[4];
      //newestName = newMessageCall[5];
      //timestamp = newMessageCall[6];
      
    } catch (error) {
      console.error("Error calling readMessage:", error);
      newestMessage = "Error reading message";
    }

    const formatPrice = parseFloat(ethers.utils.formatEther(newestPrice)).toString();

    // Attempt to resolve ENS name using the mainnet provider
    try {
      const ensName = await mainnetProvider.lookupAddress(newestMessenger);
      if (ensName) {
        newestMessenger = ensName;
      }
    } catch (ensError) {
      console.error("Error resolving ENS:", ensError);
      // If ENS resolution fails, we'll keep the original address
    }

    return {
      props: {
        price: formatPrice,
        message: newestMessage,
        imgHash: newestImgHash,
        messenger: newestMessenger,
        networkName: "BASE_MAINNET",
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
  