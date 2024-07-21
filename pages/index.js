import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import Message from '../components/message.js';
import { sepolia } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import Details from '../components/details.js';
import Input from '../components/input.js';
import titillium from '@/styles/fonts/font.js';



const ABI = [
  "event MessageChanged(uint256 newPrice, address messenger, , uint256 msgCounter)",
  "function setMessage(string memory newMessage, uint256 priceIncrease) external payable",
  "function readMessage() public view returns (string memory, uint256)",
  "function getMessages(uint256 _msgCounter) public view returns (string memory)",
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

export default function Home({ newMessage, price }) {
  const [style, setStyle] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const networkId = await provider.getNetwork();
        console.log(accounts);
        if (accounts.length > 0) {
          setIsConnected(networkId.chainId === myChain.id);
        }
        else {
          setIsConnected(false);
        }
      }
    };
    window.ethereum?.on('chainChanged', checkConnection);
    window.ethereum?.on('accountsChanged', checkConnection);
    checkConnection();
    
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
    return () => {
      window.removeEventListener('resize', updateStyle);
      window.ethereum?.removeListener('chainChanged', checkConnection);
      window.ethereum?.removeListener('accountsChanged', checkConnection);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

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
          <span>
            <Header isConnected={isConnected} client={client} wallets={wallets} />
            <Message text={newMessage} />
            {/* <Details /> */}
            <Footer price={price} isConnected={isConnected} client={client} wallets={wallets} mycChain={myChain} />
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
  const newMessageCall = await contract.readMessage();
  const newMessage = newMessageCall[0];
  const counter = newMessageCall[1];
  console.log(`msg counter: ${counter.toNumber()}`);
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
  

