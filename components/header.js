import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { ConnectButton, ThirdwebProvider } from 'thirdweb/react';
// import { sepolia } from "thirdweb/chains";
// import { createThirdwebClient } from "thirdweb";
// import { createWallet } from "thirdweb/wallets";

// const myChain = sepolia;

// const client = createThirdwebClient({
//   clientId: process.env.NEXT_PUBLIC_THIRDWEB_ID,
// });

// const wallets = [
//   createWallet("io.metamask"),
//   createWallet("com.coinbase.wallet"),
//   createWallet("com.trustwallet.app"),
// ];


export default function Header() {
    //const [showWallet, setShowWallet] = useState(false);
    const router = useRouter();
    const ref = useRef(null);
    const [lottie, setLottie] = useState(null);

    useEffect(() => {
        import('lottie-web').then((lot) => { setLottie(lot.default) });
    }, []);

    useEffect(() => {
        if (lottie && ref.current) {
            const animation = lottie.loadAnimation({
                container: ref.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: 'MXM_lottie.json',
            });

        return () => animation.destroy()
        }
    },[lottie])

    return (
        <>
            <div className="flex">
                <button>
                    <div className="m-2 absolute top-5 left-5 z-10" ref={ref} onClick={() => {
                        // Check if the current path is not the homepage
                        if (router.pathname !== '/') {
                            router.push('/');
                        }
                        }}>
                    </div>
                </button>
            </div>
                            <div className="m-2 absolute top-3 right-1">
                    {/* {isConnected && showWallet === true && ( */}
                        {/* <ThirdwebProvider>
                            <ConnectButton
                                client={client}
                                wallets={wallets}
                                theme={"dark"}
                                    connectModal={{
                                    size: "compact",
                                    termsOfServiceUrl: "https://mxm.social/terms",
                                    showThirdwebBranding: false,
                                }}
                                chain={myChain}
                                onDisconnect={() => setShowWallet(false)}
                            />
                        </ThirdwebProvider> */}
                    {/* )} */}
                </div>
        </>
    )
}
