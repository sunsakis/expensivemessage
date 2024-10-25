import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
import ABI from '../contract/ABI.js';

export default function How({ newestPrice }) {

  return (
    <div 
        style={{
            backgroundImage: "url('/background_blue.svg')",
            backgroundSize: 'cover',
            width: '100%',
            minHeight: '100vh',
            minWidth: '100vw',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            backgroundAttachment: 'fixed',
            }}
            className="text-white px-4 sm:px-6 lg:px-8" // Adjust padding based on screen size
    >
    <Head>
        <title>How It Works?</title>
        <meta name="description" content="How does posting the Most Expensive Message reward your free speech?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <br/><br/><br/><br/>
    <Header />
    <main className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto my-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            How does it work?
        </h1>
        <p className="text-2xl font-thin mb-8 mt-4">
        It's all about the message. Expensive Message is a platform where you can post your message to the world. 
        <br/><br/>
        Here's how to do it and earn while you're at it:
        </p>
        <br/>
        {/* <div className="mx-auto w-full max-w-[560px] md:max-w-[640px] lg:max-w-[800px] xl:max-w-[960px]">
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/u7lkKGd1-M8?si=_3-H-q68AhsT47KJ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div> */}
        <br/>
        <div className="grid grid-cols-1 gap-4 mb-8 mx-auto font-thin">
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Make sure you have Metamask or another ETH supporting wallet.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Click on <button className="underline text-blue-300" onClick={() => window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
                })}>Post Your Message</button>.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>You must outbid the current owner by 2x.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Write the message you want highlighted to the world.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Add your name, your social handle or your ETH address or just leave blank to remain anonymous.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Add a picture, or leave blank.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Read the <Link href="/terms" className="underline text-blue-300">terms and conditions</Link> carefully and tick that you accept them.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Press Connect Wallet.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Choose the wallet from the choices available (Metamask recommended).</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Submit the transaction (you'll pay the gas at this stage too).</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Wait for confirmation, at which the page will automatically reload.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Now you'll see your Expensive Message.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Enjoy the ownership, the interest, the conversations, the publicity.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>When you are outbid by someone else, you get back your full investment <b>plus half</b> the price increase.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>You don't have to do anything, it'll simply arrive in your wallet.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Follow our <Link href="https://t.me/MostExpensiveMessage" rel="nofollow" target="_blank" className="underline text-blue-300">Telegram</Link> to be notified when a more expensive message is posted.</p>
        </div>
        </div>
        <br/>
        <div className="my-8 text-2xl font-bold text-center">
          <h2>
            Example Transaction:
          </h2>
          <br/>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8 mx-auto px-10">
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">You Pay</h3>
            <p>1 RGCVII</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">New Owner Bids</h3>
            <p>2 RGCVII</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">You Receive</h3>
            <p>Your 1 RGCVII back <span className="text-green-500">+ 0.5 RGCVII profit</span>, while the other 50% (0.5 RGCVII) go to the treasury.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2 text-green-200">Plus</h3>
            <p>The prestige of having owned an Expensive Message.</p>
          </div>
          <i className="text-center mx-auto">No action required on your part – funds are automatically sent to your wallet.</i>
        </div>
        <br/><br/>
        <div
            className="bg-black bg-opacity-50 p-8 rounded-xl border mx-10 transition duration-500 ease-in-out hover:bg-white hover:text-black hover:border-black">
                    <h2 className="text-3xl font-bold mb-2">What are you waiting for?</h2>
                    <br/>
                    <p className="text-xl">Go turn your free speech into profit now by posting your message!</p>
        </div>
        <br/>
      </main>
      {/* <Footer msgPrices={newestPrice} text={""}/> */}
    </div>
  )
}

export async function getServerSideProps() {

    const settings = {
      apiKey: process.env.ALCHEMY_API,
      network: Network.BASE_MAINNET,
    };
  
    const alchemy = new Alchemy(settings);
    const ethersProvider = new ethers.providers.JsonRpcProvider("https://mainnet.base.org");
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);
    const newestPrice = await contract.getPrice();
    const formatPrice = parseFloat(ethers.utils.formatEther(newestPrice)).toString();
  
    return {
      props: {
        newestPrice: formatPrice,
      },
      //revalidate: 1,
    };
  }