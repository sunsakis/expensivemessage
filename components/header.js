import { useState } from 'react';
import Image from 'next/image';
import {
    ThirdwebProvider,
    ConnectButton,
  } from "thirdweb/react";

export default function Header({ isConnected, client, wallets, myChain, showNext, counter, reset }) {
    const [showWallet, setShowWallet] = useState(true);
    
    return (
        <>
            <div className="flex">
                <div className="m-2 absolute top-5 left-5 z-10">

                    <button className="flex" onClick={reset}>
                        <Image
                            src="/color_default.svg"
                            alt="Expensive Message logo"
                            width={116}
                            height={48}
                        />
                    </button>
                    
                </div>
                <div className="m-2 absolute top-3 right-1">
                    {isConnected && showWallet === true && (
                        <ThirdwebProvider>
                            <ConnectButton
                                client={client}
                                wallets={wallets}
                                theme={"dark"}
                                    connectModal={{
                                    size: "compact",
                                    termsOfServiceUrl: "https://YadaYa",
                                    showThirdwebBranding: false,
                                }}
                                chain={myChain}
                                onDisconnect={() => setShowWallet(false)}
                            />
                        </ThirdwebProvider>
                    )}
                </div>
                {counter !== 0 && (
                    <div className="fixed inset-x-0 top-0 flex justify-center text-xl">
                        <div className="flex justify-center text-center items-center mx-auto text-xl mt-3 my-auto">
                            <button className="-rotate-90" onClick={showNext}>
                                →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
