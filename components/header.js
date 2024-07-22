import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import {
    ThirdwebProvider,
    ConnectButton,
  } from "thirdweb/react";

export default function Header({ isConnected, client, wallets, myChain }) {
    const [showWallet, setShowWallet] = useState(true);

    return (
            <div className="flex">
                <div className="m-2 absolute top-5 left-5">
                    <Link href="/">
                    <button className="flex">
                        <Image
                            src="/color_icon.svg"
                            alt="Expensive Message logo"
                            width={50}
                            height={50}
                        />
                        <b className="m-1 text-2xl">MXM</b>
                    </button>
                    </Link>
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
            </div>
    )
}
