import React, { useState } from 'react';
import Router from 'next/router';
import { 
  ConnectWallet,
  useConnectionStatus,
  useSwitchChain,
  ChainId, 
  useNetworkMismatch,
} 
from '@thirdweb-dev/react';
import { Ethereum, Sepolia } from '@thirdweb-dev/chains';
import { ethers } from 'ethers';
import styles from '@/styles/Home.module.css';

const ABI = [
  "event MessageChanged(uint256 newPrice, address messenger)",
  "function setMessage(string memory newMessage) external payable",
  "function getMessage(uint256 _msgPrice) external view returns (string memory)",
  "function getPrice() external view returns (uint256)",
  "function withdraw() external",
];

const MessageField = () => {
  
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState(0.00001);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    try{
    setMessage(e.target.value);
    } catch (error) {
      alert(error);
    }
  };
  
  const handlePriceClick = async (e) => {
    try {
    e.preventDefault();
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, signer);
      const _price = await contract.getPrice();
      setPrice(ethers.utils.formatEther(_price));
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    setLoading(true); // Show loading bar
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ABI,
      signer
    );

      await contract.setMessage(message, {
        value: ethers.utils.parseEther(price)
      }).then((tx) => {
        provider.waitForTransaction(tx.hash)
        .then(() => {
          setLoading(false);
          Router.push('/');
        }
        )})
    }

    catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  
  const isMismatched = useNetworkMismatch();
  const connectionStatus = useConnectionStatus();
  const switchChain = useSwitchChain();

  if (connectionStatus === "disconnected") return (
    <div class="fixed bottom-8 sm:bottom-5 justify-center">
      <ConnectWallet 
        btnTitle="Connect MetaMask"
        modalTitle="Choose your wallet provider"
        className={styles.connect}
      />
    </div>
  );

  if (connectionStatus === "connecting") return (
    <div class="fixed bottom-8 sm:bottom-5 justify-center">
      <ConnectWallet />
    </div>
  );

  if (ChainId !== Ethereum.chainId && isMismatched) try { 
    return (
    <div class="fixed bottom-8 sm:bottom-5 justify-center">
      <button 
        class="rounded-lg bg-white text-black font-medium p-2 hover:bg-green-500 hover:text-white transition-all" 
        onClick={() => switchChain(Ethereum.chainId)}>
          Switch to Ethereum
      </button>
    </div>
  );
  } catch (error) {
    alert(error);
  }

  if (connectionStatus === "connected") 
  
  return (
    <div class="fixed bottom-2 flex flex-col items-center" id="Write">
  {loading && (
      <button
        type="button"
        class="rounded-lg bg-white text-black font-medium h-5 w-5 p-8 transition-all"
        disabled
      >
        <svg class="animate-spin h-[40px] w-[45px]">
        <circle cx="15" cy="15" r="15"/>
        </svg>
      </button>
  )} 
  <br/>
    <textarea
      onChange={handleTextChange}
      onClick={handlePriceClick}
      className="focus:h-[100px] overflow-y-auto text-sm transition-all resize-none rounded font-mono p-2 bg-white text-black w-[350px] h-[38px]"
      placeholder="What is your message?"
      form="postMessage"
      required
    ></textarea>
  
  {!loading && (
    <form onSubmit={handleSubmit} id="postMessage">
      <button class="font-bold absolute bottom-2 right-4 text-matrix hover:text-green-500" type="submit">
        {'>'}
      </button>
    </form>
  )}
</div>

  );
};


export default MessageField;