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
    "event MessageChanged(uint256 newPrice, address messenger, , uint256 msgCounter)",
    "function setMessage(string memory _message) external payable",
    "function getMessages(uint256 _msgCounter) public view returns (string memory)",
    "function getPrice() public view returns (uint256)",
    "function withdraw() external",
  ];

export default function Footer( { price } ) {
  const [showModal, setShowModal] = useState(false);
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [message, setMessage] = useState('');
  const [bid, setBid] = useState();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setClosingAnimation(true);
    setTimeout(() => {
      setShowModal(false);
      setClosingAnimation(false); // Reset the animation state for the next open
    }, 500); // Match this duration to your animation duration
  };

  const handleTextChange = (e) => {
    try{
        setMessage(e.target.value);
        } catch (error) {
        alert(error);
        }
  };

  const handleBidChange = (e) => {
    try {
      // Parse the input value to a float
      const inputBid = parseFloat(e.target.value);
      // Add 0.0001 to the input bid
      const adjustedBid = (inputBid + 0.0001).toFixed(4); // Ensure the bid is always 0.0001 higher
      // Update the bid state with the adjusted bid
      setBid(adjustedBid.toString()); // Convert back to string if your state expects a string
    } catch (error) {
      alert(error);
    }
  };

  const minBid = (parseFloat(price) + 0.0001).toFixed(4);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true); // Show loading indicator
  
      // Validate bid is a string and not empty
      if (typeof bid !== 'string' || bid.trim() === '') {
        throw new Error('Bid must be a non-empty string');
      }
  
      const parsedBid = ethers.utils.parseEther((bid).toString()); // Convert bid + fee to BigNumber
  
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        ABI,
        signer
      );
  
      await contract.setMessage( message, { value: parsedBid } ).then((tx) => {
        return provider.waitForTransaction(tx.hash);
      }).then(() => {
        setLoading(false);
        handleClose();
        Router.push('/');
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      alert(error.message);
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

  if (ChainId !== Sepolia.chainId && isMismatched) try { 

    return (
      <div class="fixed bottom-8 sm:bottom-5 justify-center">
        <button 
          class="rounded-lg bg-white text-black font-medium p-2 hover:bg-green-500 hover:text-white transition-all" 
          onClick={() => switchChain(Sepolia.chainId)}>
            Switch to Sepolia
        </button>
      </div>
    );
  } catch (error) {
    alert(error);
  }

    return (

    <>
    <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }

          @keyframes slideOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-20px); opacity: 0; }
            }

            .slideOut {
            animation: slideOut 1s ease-out forwards;
            }
        `}
      </style>
      <div className="absolute bottom-1 left-0 right-0">
            <div className="sm:m-5">
                <p className="text-sm text-right tracking-tight mr-9 text-gray-300">
                        This MXM costed
                    </p>
                    <p className="text-right mr-8">
                        <b className="text-2xl">
                        {price} ETH
                        </b>
                    </p>
                    <div className="flex justify-end mx-auto">
                    <button 
                        className="w-full sm:w-auto mb-12 sm:mb-0"
                        onClick={() => setShowModal(true)}>
                        <p className="sm:px-4 p-3 mt-2 mx-6 font-bold bg-white text-black hover:bg-slate-100 rounded-xl">
                            Claim the MXM
                        </p>
                    </button>
                </div>
            </div>
            <div className="absolute bottom-1 flex justify-center mx-auto w-full sm:w-auto m-2 sm:m-5">
                <div className="flex text-xs sm:text-sm text-gray-200 ml-1">
                    <p className="mx-2">What is the MXM?</p>
                    <p className="mx-2">Archive</p>
                    <p className="mx-2">Terms and conditions</p>
                </div>
            </div>
        </div>
      {showModal ? (
        <>
         <div className="fixed inset-0 bg-black opacity-60 z-40 flex justify-center items-center" onClick={() => handleClose()}></div> 
         <div className={`justify-center items-center flex fixed inset-0 max-w-xs md:max-w-md max-h-fit my-auto mx-auto z-50 outline-none focus:outline-none ${closingAnimation ? 'slideOut' : 'fadeIn'}`} onClick={(e) => e.stopPropagation()}>
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-xl font-semibold text-black">
                    Claim the MXM
                  </h3>
                  <button
                    className="ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleClose()}
                    >
                    <span className="bg-transparent text-red-800 h-5 w-5 text-xl block">
                        x
                    </span>
                </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form 
                    className="space-y-1"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="bid" className="text-black">
                        Your bid:
                    </label>
                    <input
                        onChange={handleBidChange}
                        id="bid"
                        type="number"
                        step="0.0001"
                        min={minBid}
                        placeholder="At least 0.0001 ETH higher"
                        className="px-3 py-3 border border-gray-300 rounded-md w-full text-gray-600"
                        required
                    />
                    <div className="pt-4">
                    <label className="text-black">
                        The message:
                    </label>
                    <textarea
                        onChange={handleTextChange}
                        rows="4"
                        placeholder="The message"
                        className="px-3 py-3 mt-1 border border-gray-300 rounded-md w-full text-gray-600"
                        required
                    />
                    </div>
                    <div className="flex items-center">
                      <input
                        id="termsAndConditions"
                        type="checkbox"
                        required
                        className="form-checkbox h-5 w-5 text-gray-600"
                      /><label htmlFor="termsAndConditions" className="ml-2 text-sm text-gray-700">
                        I have read and accept the terms and conditions
                      </label>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-purple-400 text-white active:bg-purple-500 hover:bg-purple-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Next
                  </button>
                </div>
                  </form>
                </div>
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
              </div>
            </div>
          </div>
          
        </>
      ) : null}
    </>
    )
};

