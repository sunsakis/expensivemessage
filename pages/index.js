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
  "function setMessage(string memory newMessage) public",
  "function getMessages(uint256 _msgPrice) public view returns (string memory)",
  "function readMessage() public view returns (string memory)",
];

export default function Home() {

 
  const [newMessage, setMessage] = useState('');
  
  
  
  async function getMessage() {
    const ethersProvider = await alchemy.config.getProvider();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);
    const messages = await contract.getMessages(ethers.utils.parseUnits("0.00001"));
    console.log(messages);
    return messages;
  }
  
  async function getMessageString() {
    const messageString = await getMessage();
    return messageString;
  }
  useEffect(() => {
    getMessageString().then((messageString) => {
      setMessage(messageString);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Expensive Message - Write Internet History (For What It's Worth)</title>
        <meta name="description" content="Become a part of Internet history, even if every message costs $100 more than the previous one." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <InputField />
        <Message text={newMessage}/>
      </main>
    </>
  )
}
