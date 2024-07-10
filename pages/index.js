import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import Message from '../components/message.js';
import Input from '../components/input.js';



const ABI = [
  "event MessageChanged(uint256 newPrice, address messenger)",
  "function setMessage(string memory newMessage) external payable",
  "function getMessages(uint256 _msgPrice) public view returns (string memory)",
  "function readMessage() public view returns (string)",
  "function getPrice() public view returns (uint256)",
];

export default function Home({ newMessage, price }) {  

  return (
    <>
      <Head>
        <title>MXM - Most Xpensive Message</title>
        <meta name="description" content="Become a part of Internet history, but every message costs more than the previous one." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="World's Most Expensive Message Board" />
        <meta property="og:description" content="Become a part of Internet history, but every message costs more than the previous one." />
        <meta property="og:url" content="expensivemessage.com" /> 
        <meta property="og:site_name" content="Expensive Message" />
        <meta name="twitter:creator" content="@codeisthelaw" /> 
      </Head>
      <main className={styles.main}>
      <Header />
        <Message text={newMessage} />
        {/* <Input /> */}
        <Footer price={price} />
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
  let priceIndex = String(price / 4);
  console.log(price)


  const fetchedMessages = [];

  
  while (priceIndex >= ethers.utils.parseEther("0.01")) {
    const message = await contract.getMessages((priceIndex));
    fetchedMessages.push(message);
    priceIndex /= 2;
  }

  const formatPrice = ethers.utils.formatEther(price);   

  return {
    props: {
      newMessage: newMessage,
      price: formatPrice,
    },
    //revalidate: 1,
  };
}
  

