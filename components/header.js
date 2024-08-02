import Image from 'next/image';
import Link from 'next/link';

export default function Header() {

    return (
        <>
            <div className="flex">
                <div className="m-2 absolute top-5 left-5 z-10">
                    <Link href="/">
                    <button className="flex">
                        <Image
                            src="/color_default.svg"
                            alt="Expensive Message logo"
                            width={116}
                            height={48}
                        />
                    </button>
                    </Link>
                </div>
                {/* <div className="m-2 absolute top-3 right-1">
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
                </div> */}
                {/* {counter !== 0 && (
                    <div className="fixed inset-x-0 top-0 flex justify-center text-xl">
                        <div className="flex justify-center text-center items-center mx-auto text-xl mt-3 my-auto">
                            <button className="-rotate-90" onClick={showNext}>
                                →
                            </button>
                        </div>
                    </div>
                )} */}
            </div>
        </>
    )
}
