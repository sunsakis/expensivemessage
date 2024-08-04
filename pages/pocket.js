import { ethers } from 'ethers';
import React from 'react';
import ABI from '../contract/ABI.js';

export default function Pocket() {

  const withdraw = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          ABI,
          signer
        );

        const transaction = await contract.withdraw();
        await transaction.wait();
        console.log('Withdrawal successful');
      } else {
        console.log('Ethereum wallet is not connected');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const overwrite = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          ABI,
          signer
        );

        const transaction = await contract.overwrite("This message was overwritten due to inciting hatred", "", "admin", 1);
        await transaction.wait();
        console.log('Overwrite successful');
      } else {
        console.log('Something went wrong');
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={withdraw}>Pocket</button>
    </div>
  );
}