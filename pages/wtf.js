import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/header.js';
import InputField from '../components/input.js';
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';

const ABI = [
  "function getPrice() external view returns (uint256)",
];

export default function Wtf({ price }) {
  
  return (
    <>
      <Head>
        <title>Expensive Message Board - WTF</title>
        <meta name="description" content="Write history. All posts are stored on the Ethereum blockchain and are accessible forever." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header price = {price}/>
        <InputField />
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-xs sm:max-w-sm md:max-w-md w-[500px] p-4 border rounded-lg whitespace-pre-line break-words text-[1rem] font-mono overflow-y-auto">
                    <i>
                        <h1 class="text-lg">Write history.</h1><br/>
                        <p>All posts are stored on the Ethereum blockchain and are accessible forever.</p><br/>
                        <p>At the moment the messages are sent to Sepolia testnet.</p><br/>
                        <p><b>Everyone can write here</b> - every message costs 0.00001 Sepolia ETH more than the previous one.</p><br/>
                        <p>Once we reach a critical mass of readers, we will transition to the mainnet.</p><br/>
                        <p>The goal is to become internet`s most valuable textboard.</p><br/>
                    </i>
            </div>
        </div>
      </main>
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
  const price = await contract.getPrice();
  const formatPrice = ethers.utils.formatEther(price);

  return {
    props: {
      price: formatPrice,
    },
    //revalidate: 1,
  };
}
