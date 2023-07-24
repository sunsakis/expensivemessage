import React, { useState } from 'react';
import { 
  ConnectWallet,
  useConnectionStatus,
  useSwitchChain,
  ChainId, 
  useNetworkMismatch} 
from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';

const MessageField = () => {
  const [Message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the Message data, like sending it to a server
    console.log(Message);
    setMessage('');
  };
  const isMismatched = useNetworkMismatch();
  const connectionStatus = useConnectionStatus();
  const switchChain = useSwitchChain();

  if (connectionStatus === "disconnected") return (
    <div class="absolute bottom-8 sm:bottom-5 justify-center">
      <ConnectWallet />
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
      <button class="" onClick={() => switchChain(Sepolia.chainId)}>Switch to Sepolia</button>
    </div>
  );
  } catch (error) {
    console.error(error);
  }

  if (connectionStatus === "connected") return (
    <div class="absolute bottom-1 justify-center">
        <textarea
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={() => switchChain(Sepolia.chainId)}
            className="focus:h-[100px] text-sm transition-all resize-none text-center rounded font-mono p-2 bg-white text-black w-[350px] h-[38px]"
            placeholder='What is your message?'
        >
        </textarea>
        <button 
            class="absolute bottom-4 right-2 text-matrix hover:text-green-500" 
            type="submit"
        >
            {'>'}
        </button>
    </div>
  );
};

export default MessageField;
