import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
import ABI from '../contract/ABI.js';

export default function How({ newestPrice, settings }) {

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
        <title>How It Works? | MXM</title>
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
        It's all about the message. The Most Expensive Message (MXM) is a platform where you can post your message to the world. Here's how to do it and earn while you're at it:
        </p>
        <br/>
        <div className="grid grid-cols-1 gap-4 mb-8 mx-auto font-thin">
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Make sure you have Metamask or another ETH supporting wallet.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Click on <span className="underline text-blue-300" onClick={() => window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
                })}>Claim the MXM</span>.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>You must outbid the current owner by a minimum of 5% or 0.02 ETH, whichever is higher.</p>
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
            <p>Read the terms and conditions page carefully and tick that you accept.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Press Connect Wallet.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Choose the wallet from the choices available (we recommend Metamask).</p>
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
            <p>Now you'll see your Most eXpensive Message.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>We'll publish it on our social channels, from where you can share it.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Enjoy the ownership, the interest, the conversations, the publicity.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>When you are outbid by someone else, you get back your full investment <b>plus</b> half the price increase.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>You don't have to do anything, it'll simply arrive in your wallet.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-4 w-4 flex-shrink-0 mr-4"></div>
            <p>Follow our <Link href="https://t.me/MostXMessage" rel="nofollow" target="_blank" className="underline text-blue-300">Telegram</Link> to be notified when a more expensive message is posted.</p>
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
            <p>1 ETH</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">New Owner Bids</h3>
            <p>At least 5% more, so 1.05 ETH for example</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">You Receive</h3>
            <p>1 ETH <span className="text-green-500">+ 0.025 ETH profit</span>, which is 50% of the price increase</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2 text-green-200">Plus</h3>
            <p>The prestige of having owned and broadcast the MXM</p>
          </div>
          <i className="text-center mx-auto">No action required on your part – funds are automatically sent to your wallet.</i>
        </div>
        <br/><br/>
        <Link href="/">
        <div
            className="bg-black bg-opacity-50 p-8 rounded-xl border mx-10 transition duration-500 ease-in-out hover:bg-purple-950 hover:border-purple-500 hover:text-white">
                    <h2 className="text-3xl font-bold mb-2">What are you waiting for?</h2>
                    <br/>
                    <p className="text-xl">Get rewarded for free speech now!</p>
        </div>
        </Link>
        <br/>
      </main>
      <Footer msgPrices={newestPrice} text={"Newest"} settings={settings}/>
    </div>
  )
}

export async function getServerSideProps() {

    const settings = {
      apiKey: process.env.ALCHEMY_API,
      network: Network.ETH_SEPOLIA,
    };
  
    const alchemy = new Alchemy(settings);
    const ethersProvider = await alchemy.config.getProvider();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, ethersProvider);
    const newestPrice = await contract.getPrice();
    const formatPrice = ethers.utils.formatEther(newestPrice);
  
    return {
      props: {
        newestPrice: formatPrice,
        settings: settings,
      },
      //revalidate: 1,
    };
  }