import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import Header from '../components/header.js';
import InputField from '../components/input.js';

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
  // const ethersProvider = await alchemy.config.getProvider();
  // const contract = new ethers.Contract("0x4df1c361dde7ef090740340fbf8b2f1de8e2ab5b", contractABI, ethersProvider);
  // const message = await contract.readMessage();
  //console.log(message);
  // const filter = contract.filters.MessageChanged();
  // const events = await contract.queryFilter(filter);
  // console.log(events);
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
        <div className={styles.description}>
          <p>
            <i>uhiubhiihiihiuhiuhohohiuhihihiygfutfwas inasdljkasjflasj flsajflaksjflaksjfalkgvuguguyguyoguogsiuiiiuhiuhiuhi uhiuhiuhihihiuhi hijsflkasj Argentina in 1962</i>
          </p>
        </div>
        <InputField />
      </main>
    </>
  )
}
