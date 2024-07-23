import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import {
    ThirdwebProvider,
    ConnectButton,
  } from "thirdweb/react";

export default function Header({ isConnected, client, wallets, myChain, showNext, counter, reset }) {
    const [showWallet, setShowWallet] = useState(true);
    console.log(counter)

    return (
        <>
            <div className="flex">
                <div className="m-2 absolute top-5 left-5">

                    <button className="flex" onClick={reset}>
                        <Image
                            src="/color_icon.svg"
                            alt="Expensive Message logo"
                            width={50}
                            height={50}
                        />
                        <b className="m-1 text-2xl">MXM</b>
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
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="flex justify-center text-center items-center mx-auto text-xl mt-16 my-auto">
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
