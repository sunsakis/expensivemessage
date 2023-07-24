import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import Header from '../components/header.js';
import InputField from '../components/input.js';
import Message from '../components/message.js';

const settings = {
  apiKey: process.env.ALCHEMY_API, // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const contractABI = [
  "event MessageChanged(string newMessage, uint256 newPrice, address messenger)",
  "function setMessage(string memory newMessage) public",
  "function readMessage() public view returns (string memory)",
];

async function getMessage() {
  const ethersProvider = await alchemy.config.getProvider();
  const contract = new ethers.Contract("0x4df1c361dde7ef090740340fbf8b2f1de8e2ab5b", contractABI, ethersProvider);
  const message = await contract.readMessage();
  console.log(message);
}


export default function Home() {

  useEffect(() => {
    getMessage();
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
        <Message text={"Adolf Hitler was in Argentina in 1962. However, this does not mean that he was dead, or alive. This does mean that the brain has been washed by Western propaganda, mind you, not Eastern, like some might lead you to believe. I do believe that Western propaganda is better, though. And if it is so, that it is better, then it should be also said that it will be suficiento to not include other people that would not allow it to take place without ny special hithertoergonomical recommendations. Without the contratical taking place, the contratical will not take place and so it should be known. And if it is know, then let it be, let it be, oh let it be, just let it be. Singing words of wisdom, let it be. WHat is happening guys, I do nto understand completely, however `i am trying to, I definitely am trying to understand what is going on around me. and if I would not, then who would, let me ask"}/>
      </main>
    </>
  )
}
