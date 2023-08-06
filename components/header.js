import Link from 'next/link';
import Image from 'next/image';
import { Network, Alchemy } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API, // Replace with your Alchemy API Key.
    network: Network.ETH_SEPOLIA, // Replace with your network.
  };
  
  const alchemy = new Alchemy(settings);
  
  const ABI = [
    "function getPrice() public view returns (uint 256)",
  ];

export default function Header() {

    const [price, setPrice] = useState();

    async function getPrice() {
        try {
        const ethersProvider = await alchemy.config.getProvider();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);
        const price = await contract.getPrice();
        setPrice(ethers.utils.formatEther(price));}
        catch (err) {
            console.log(err);
        }
      }

      useEffect(() => {
        getPrice()
      }, []);

    return (
        <nav className="flex fixed top-0 w-[350px] sm:w-[600px] dark:bg-black">
            <div className="m-2 relative">
                <Link href="/">
                <button>
                    <Image
                        src="/expensivemessagelogo.png"
                        alt="Expensive Message logo"
                        width={35}
                        height={35}
                        className="sm:w-10 sm:h-10 cursor-pointer hover:rotate-90 transform-all duration-500"
                    />
                </button>
                </Link>
            </div>
            <Link href="/wtf">
            <div className="m-2 p-2 mb-4 top-0 absolute right-0 border rounded-md">
                <p className="font-mono text-sm tracking-tight sm:text-lg md:text-sm">
                    <b>
                    <span className="text-matrix">Ξ</span>
                    {price} ETH
                    </b>{" "}
                    FOR 1 MESSAGE
                </p>
            </div>
            </Link>
        </nav>
    )
}
