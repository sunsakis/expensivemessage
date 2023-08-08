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
import { Sepolia } from '@thirdweb-dev/chains';
import { ethers } from 'ethers';

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
    setMessage(e.target.value);
  };
  
  const handlePriceClick = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, signer);
    const _price = await contract.getPrice();
    setPrice(ethers.utils.formatEther(_price));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading bar
    
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ABI,
      signer
    );

    contract.on("MessageChanged", (newPrice, messenger) => {
      console.log(newPrice, messenger);
    });

    try { 
      await contract.setMessage(message, {
        value: ethers.utils.parseEther(price)
      }).then((tx) => {
        provider.waitForTransaction(tx.hash)
        .then(() => {
          setTimeout(Router.reload(), 1000);
        }
        )})
    }
    catch (error) {
      console.error(error);
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
      />
    </div>
  );

  if (connectionStatus === "connecting") return (
    <div class="absolute bottom-8 sm:bottom-5 justify-center">
      <ConnectWallet />
    </div>
  );

  if (ChainId !== Sepolia.chainId && isMismatched) try { 
    return (
    <div class="absolute bottom-8 sm:bottom-5 justify-center">
      <button 
        class="rounded-lg bg-white text-black font-medium p-2 hover:bg-green-500 hover:text-white transition-all" 
        onClick={() => switchChain(Sepolia.chainId)}>
          Switch to Sepolia
      </button>
    </div>
  );
  } catch (error) {
    console.error(error);
  }

  if (connectionStatus === "connected") 
  
  return (
    <div class="fixed bottom-1 justify-center" id="Write">
  {loading ? (
      <button
        type="button"
        class="rounded-lg bg-white text-black font-medium h-5 w-5 p-8 transition-all"
        disabled
      >
        <svg class="animate-spin h-[40px] w-[45px]">
        <circle cx="15" cy="15" r="15"/>
        </svg>
      </button>
  ) : (
    <textarea
      onChange={handleTextChange}
      onClick={handlePriceClick}
      className="focus:h-[100px] overflow-y-auto text-sm transition-all resize-none rounded font-mono p-2 bg-white text-black w-[350px] h-[38px]"
      placeholder="What is your message?"
      form="postMessage"
      required
    ></textarea>
  )}
  {!loading && (
    <form onSubmit={handleSubmit} id="postMessage">
      <button class="font-bold absolute bottom-4 right-4 text-matrix hover:text-green-500" type="submit">
        {'>'}
      </button>
    </form>
  )}
</div>

  );
};


export default MessageField;