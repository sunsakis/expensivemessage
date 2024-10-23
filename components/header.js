import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
    // const ref = useRef(null);
    // const [lottie, setLottie] = useState(null);

    // useEffect(() => {
    //     import('lottie-web').then((lot) => { setLottie(lot.default) });
    // }, []);

    // useEffect(() => {
    //     if (lottie && ref.current) {
    //         const animation = lottie.loadAnimation({
    //             container: ref.current,
    //             renderer: 'svg',
    //             loop: false,
    //             autoplay: true,
    //             path: 'MXM_lottie_monochrome.json',
    //         });

    //     return () => animation.destroy()
    //     }
    // },[lottie])

    return (
        <>
            {/* <div className="fixed top-5 left-5 w-2/3 sm:w-1/5 flex justify-start z-10" ref={ref} onClick={() => {
                         // Check if the current path is not the homepage
                         if (router.pathname !== '/') {
                             router.push('/');
                         }
                         }}> */}
            <div className="fixed top-5 left-5 w-2/3 sm:w-1/5 flex justify-start z-10" onClick={() => {
                         // Check if the current path is not the homepage
                         if (router.pathname !== '/') {
                             router.push('/');
                         }
                         }}>
                    <button onClick={() => {
                        if (router.pathname !== '/') {
                            router.push('/');
                        }
                    }}>
                        <Image 
                            src="/hamster.webp" 
                            alt="Hamster with cash." 
                            width={100} 
                            height={100} 
                            className="mt-5"
                        />
                    </button>
                </div>
        </>
    )
}
