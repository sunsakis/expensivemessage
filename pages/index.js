import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import Message from '../components/message.js';
import Details from '../components/details.js';
import Input from '../components/input.js';
import titillium from '@/styles/fonts/font.js';



const ABI = [
  "event MessageChanged(uint256 newPrice, address messenger)",
  "function setMessage(string memory newMessage) external payable",
  "function getMessages(uint256 _msgPrice) public view returns (string memory)",
  "function readMessage() public view returns (string)",
  "function getPrice() public view returns (uint256)",
];

export default function Home({ newMessage, price }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const updateStyle = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const minDimension = Math.min(screenWidth, screenHeight);
      const profilePic = process.env.NEXT_PUBLIC_SERVER + '/uploadedImage.jpg';

      // Define maximum sizes for the gradients
      const maxFirstGradientSize = 300; // Example: 300px
      const maxSecondGradientSize = 600; // Example: 600px

      // Dynamically adjust the base size of the gradients based on the smaller screen dimension
      // Ensure it does not exceed the maximum sizes
      const baseSize = Math.min(minDimension * 0.25, maxFirstGradientSize);
      const firstGradient = `${baseSize}px`;
      const secondGradient = `${Math.min(baseSize * 2, maxSecondGradientSize)}px`;
      

      setStyle({
        backgroundImage: `radial-gradient(circle at center, transparent ${firstGradient}, black ${secondGradient}), url(${profilePic})`,
        backgroundPosition: 'center, center',
        backgroundSize: 'auto, contain',
        backgroundRepeat: 'no-repeat, no-repeat',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
      });
    };

    updateStyle();

    window.addEventListener('resize', updateStyle);

    // Cleanup
    return () => window.removeEventListener('resize', updateStyle);
  }, []); // Empty dependency array ensures this effect runs only once on mount


  // const profilePic = process.env.NEXT_PUBLIC_SERVER + '/uploadedImage.jpg';
  // const style = {
  //   backgroundImage: `radial-gradient(circle at center, transparent 15vmax, black 33vmax), url(${profilePic})`,
  //   backgroundPosition: 'center, center', // Center the gradient and the image
  //   backgroundSize: 'cover, cover', // Cover the entire element with both the gradient and the image
  //   backgroundRepeat: 'no-repeat, no-repeat', // Do not repeat the gradient or the image
  //   height: '100vh', // Make sure the div takes up the full viewport height
  //   width: '100vw', // Make sure the div takes up the full viewport width
  //   position: 'absolute', // Fix the position to cover the entire screen
  //   top: 0, // Align the top edge with the top of the viewport
  //   left: 0, // Align the left edge with the left of the viewport
  // };

  return (
    <>
      <Head>
        <title>MXM - Most eXpensive Message</title>
        <meta name="description" content="Become a part of Internet history, but every message costs more than the previous one." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="World's Most Expensive Message Board" />
        <meta property="og:description" content="Become a part of Internet history, but every message costs more than the previous one." />
        <meta property="og:url" content="expensivemessage.com" /> 
        <meta property="og:site_name" content="Expensive Message" />
        <meta name="twitter:creator" content="@codeisthelaw" /> 
      </Head>
      {/* <main className={styles.main}> */}
      <main>
        <div style={style}>
          <span className={titillium.className}>
            <Header />
            <Message text={"Hello word."} />
            {/* <Details /> */}
            <Footer price={price} />
          </span>
        </div>
      </main>
      {/* {messages.map((message, index) => (
          <Message key={index} text={message} showXLink={false} />
        ))}
        <Message 
          text={"Top messager earns 150% of message worth when a brave new message is posted! <3"} 
          showXLink={false} /> */}
    </>
  )
}

export async function getServerSideProps() {

  const settings = {
    apiKey: process.env.ALCHEMY_API, // Replace with your Alchemy API Key.
    network: Network.ETH_SEPOLIA, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);
  const ethersProvider = await alchemy.config.getProvider();
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);
  const newMessage = await contract.readMessage();
  const price = await contract.getPrice();
  // let priceIndex = String(price / 4);

  // const fetchedMessages = [];

  
  // while (priceIndex >= ethers.utils.parseEther("0.01")) {
  //   const message = await contract.getMessages((priceIndex));
  //   fetchedMessages.push(message);
  //   priceIndex /= 2;
  // }

  const formatPrice = ethers.utils.formatEther(price);   

  return {
    props: {
      newMessage: newMessage,
      price: formatPrice,
    },
    //revalidate: 1,
  };
}
  

