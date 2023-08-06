import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import Header from '../components/header.js';
import InputField from '../components/input.js';
import Message from '../components/message.js';

const settings = {
  apiKey: process.env.ALCHEMY_API, // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const ABI = [
  "event MessageChanged(uint256 newPrice, address messenger)",
  "function setMessage(string memory newMessage) external payable",
  "function getMessages(uint256 _msgPrice) public view returns (string memory)",
  "function readMessage() public view returns (string)",
  "function getPrice() public view returns (uint256)",
];

export default function Home() {

  const [messages, setMessages] = useState([]); // State to hold the messages
  const [newMessage, setMessage] = useState(''); // State to hold the newest message

  async function fetchHistory() {
    try {
      const ethersProvider = await alchemy.config.getProvider();
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);
      const newMessage = await contract.readMessage();
      console.log(newMessage);
      setMessage(newMessage);
      const price = await contract.getPrice();
      const formatPrice = price;
      const increment = 10000000000000;
      let priceIndex = ((formatPrice - increment*2));
      const fetchedMessages = [];
      while (priceIndex >= 0) {
        const message = await contract.getMessages((priceIndex));
        fetchedMessages.push(message);
        priceIndex -= increment;
      }
      setMessages(fetchedMessages);
    }
  
  catch (err) {
    console.log(err);
  }
}

    useEffect(() => {
      fetchHistory();
    }, []);



  return (
    <>
      <Head>
        <title>World's Most Expensive Message Board - Write History</title>
        <meta name="description" content="Become a part of Internet history, but every message costs more than the previous one." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <InputField />
        <Message text={newMessage} showXLink={true} />
      </main>
      {messages.map((message, index) => (
          <Message key={index} text={message} showXLink={false} />
        ))}
    </>
  )
}
  

