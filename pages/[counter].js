import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import Header from '../components/header.js';
import Head from 'next/head'
import Footer from '../components/footer.js';
import Message from '../components/message.js';
import { useState, useEffect } from 'react';
import { sepolia } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";

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

export async function getServerSideProps(context) {
    const { counter } = context.params;
    const adjustedCounter = Math.max(0, counter - 1); // Ensure it doesn't go below 0
    const settings = {
    apiKey: process.env.ALCHEMY_API, // Replace with your Alchemy API Key.
    network: Network.ETH_SEPOLIA, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);
    const ethersProvider = await alchemy.config.getProvider();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);

    // Assuming your contract has a method to fetch message by counter
    const messageCall = await contract.getMessages(adjustedCounter);
    const newCounter = await contract.readMessage().then(result => result[1]);
    const message = messageCall ? messageCall : null;
    const newestCounter = newCounter.toNumber();

    return {
    props: { message, counter: parseInt(counter), newestCounter }, // Pass message and counter as props
    };
}

export default function MessagePage({ message, counter, newestCounter }) {
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
    const router = useRouter();
    const showNextButton = counter < newestCounter - 1;

    return (
    <>
      <Head>
      <title>MXM - Most eXpensive Message</title>
        <meta name="description" content="Your message written on-chain forever, each message more valuable than the last." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="MXM - Most eXpensive Message" />
        <meta property="og:description" content="Your message written on-chain forever, each message more valuable than the last." />
        <meta property="og:url" content="mxm.social" /> 
        <meta property="og:site_name" content="MXM" />
        <meta name="twitter:creator" content="@MostXMessage" /> 
      </Head>
      <main>
        <div style={style}>
            <Header isConnected={isConnected} client={client} wallets={wallets} />
            <Message text={message} />
            <Footer price={"x"} isConnected={isConnected} client={client} wallets={wallets} mycChain={myChain} />
            <div className="mx-auto text-center flex-col flex">
                {showNextButton && (
                    <button 
                        onClick={() => router.push(`/${Math.min(counter + 1, newestCounter)}`)}
                    >
                        ^
                    </button>
                )}
                {counter === newestCounter - 1 && (
                    <button 
                        onClick={() => router.push(`/`)}
                    >
                        ^
                    </button>
                )}
                {counter > 1 && (
                    <button 
                        onClick={() => router.push(`/${counter - 1}`)}
                        className="rotate-180"

                    >
                        ^
                    </button>
                )}
            </div>
        </div>
      </main>
    </>
    );
}