import Link from 'next/link';
import Image from 'next/image';
import { Network, Alchemy } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


const settings = {
    apiKey: process.env.ALCHEMY_API, // Replace with your Alchemy API Key.
    network: Network.ETH_SEPOLIA, // Replace with your network.
  };
  
  const alchemy = new Alchemy(settings);
  
  const ABI = [
    "function getPrice() public view returns (uint256)",
  ];

export default function Header() {

    const [price, setPrice] = useState();
    const [open, setOpen] = useState(false);

    async function getPrice() {
        const ethersProvider = await alchemy.config.getProvider();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA, ABI, ethersProvider);
        const price = await contract.getPrice();
        setPrice(ethers.utils.formatEther(price));
      }

      useEffect(() => {
        getPrice()
      }, []);

    return (
        <nav className="flex absolute top-0 m-2 w-[350px] sm:w-[600px]">
            <div className="m-2 relative" onMouseLeave={() => setOpen(false)}>
                <button className="dropbtn" onMouseOver={() => setOpen(true)}>
                    <Image
                        src="/expensivemessagelogo.png"
                        alt="Expensive Message logo"
                        width={35}
                        height={35}
                        className="sm:w-10 sm:h-10 cursor-pointer"
                    />
                </button>
                {/* Dropdown menu */}
                <ul
                    className={`absolute left-0 rounded-lg shadow-xl ${
                        open ? "block" : "hidden"
                    }`}
                >
                    <Link href="/wtf">
                        <li className="flex w-full items-center px-1 sm:px-2 py-1 hover:bg-matrix rounded-lg">
                            <code>WTF</code>
                        </li>
                    </Link>
                </ul>
            </div>
            <Link href="/">
                <div className="m-2 p-2 absolute top-0 right-0 border rounded-md">
                <p className="font-mono text-xs tracking-tight sm:text-lg md:text-sm">
                    <b>
                    <span className="text-matrix">Ξ</span>
                    {price}
                    </b>{" "}
                    FOR 1 MESSAGE
                </p>
            </div>
            </Link>
        </nav>
    )
}
