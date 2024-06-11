import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/header.js';
import Link from 'next/link.js';
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
        <div className="flex justify-center items-center h-screen">
        <span className="text-matrix mr-3 text-xl hover:text-green-500">
          <Link
            className="twitter-share-button"
            href="https://x.com/codeisthelaw"
            data-via="codeisthelaw"
            data-hashtags="expensive, message"
            dnt="true"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            X
          </Link>{" "}
        </span>
            <div className="max-w-xs sm:max-w-sm md:max-w-md w-[500px] p-4 border rounded-lg whitespace-pre-line break-words text-[1rem] font-mono overflow-y-auto">
                    <i>
                        <h1 class="text-lg">Write history.</h1><br/>
                        <p><b>Everyone can write here</b> - but every message costs 2x more than the previous one.</p><br/>
                        <p>Top messenger is paid 150% of their message’s original price when a new message is posted.</p><br/>
                        <p>All posts are stored on the Ethereum blockchain and are accessible forever.</p><br/>
                        <p>What is <i>your</i> message?</p><br/>
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
