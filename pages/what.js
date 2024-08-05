import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
import ABI from '../contract/ABI.js';

export default function What({ newestPrice, settings }) {

  return (
    <div 
        style={{
            backgroundImage: "url('/background_green.svg')",
            backgroundSize: 'cover',
            width: '100%',
            minHeight: '100vh',
            minWidth: '100vw',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'right top',
            }}
            className="text-white px-4 sm:px-6 lg:px-8" // Adjust padding based on screen size
    >
    <Head>
        <title>What Is The MXM? | MXM</title>
        <meta name="description" content="The Most Expensive Message - free speech rewarded." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <br/><br/><br/><br/>
    <Header />
    <main className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto my-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            The Most Expensive Message (MXM): A Revolutionary Socialfi Experiment
        </h1>
        <br/>
        <i className="block text-center">Discover MXM - where free speech is rewarded.</i>
        <br/>
        <p className="text-2xl font-thin mb-8 mt-4">
        Welcome to the MXM, a groundbreaking Socialfi platform that empowers you to monetize your voice and make a global impact.
        </p>
        <br/>
        <div className="font-bold my-8 text-2xl text-center">
          <h2>
            Why Choose MXM?
          </h2>
          <br/>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-8 mx-auto font-thin">
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-6 w-6 flex-shrink-0 mr-4"></div>
            <p>Monetize your message while influencing the world.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-6 w-6 flex-shrink-0 mr-4"></div>
            <p>Gain exposure through our free promotion.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-6 w-6 flex-shrink-0 mr-4"></div>
            <p>Profit from the rising value of digital real estate.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-6 w-6 flex-shrink-0 mr-4"></div>
            <p>Secure blockchain-backed permanence for your statement.</p>
        </div>
        </div>
        <br/>
        <div className="my-8 text-2xl font-bold text-center">
          <h2>
            How MXM Works:
          </h2>
          <br/>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8 mx-auto px-10">
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">1. Bid for Influence</h3>
            <p>Secure the MXM by outbidding the current price (minimum 5% increase or 0.02 ETH, whichever is higher).</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">2. Share Your Powerful Message</h3>
            <p>From personal declarations to world-changing statements.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">3. Profit from Global Exposure</h3>
            <p>Enjoy the spotlight and earn when someone outbids you.</p>
          </div>
        </div>
        <br/>
        <div className="my-8 text-2xl font-bold text-center">
          <h2>
            MXM is Your Platform for:
          </h2>
          <br/>
        </div>
        <div className="gap-4 mb-8 mx-auto font-thin max-w-xl grid grid-flow-row">
            <div className="bg-black bg-opacity-50 p-8 mx-auto rounded-xl border border-gray-800 space-x-2" style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', maxWidth: '100%' }}>
                <p className="text-purple-200 hover:text-purple-400">Influence</p>
                <p className="text-gray-200 hover:text-gray-400">Advocacy</p>
                <p className="text-rose-100 hover:text-rose-300">Celebration</p>
                <p className="text-green-100 hover:text-green-300">Business</p>
                <p className="text-sky-200 hover:text-sky-400">Promises</p>
                <p className="text-amber-100 hover:text-amber-300">Proof</p>
            </div>
        </div>
        <br/>
        <div className="my-8 text-2xl font-bold text-center">
          <h2>
            Innovative Ways to Leverage MXM:
          </h2>
          <br/>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-8 mx-auto font-thin px-5">
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Announce investments.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Launch crypto tokens.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Celebrate partnerships.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Showcase art.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Champion human rights.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Expose corruption.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Promote free speech.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Fight oppression.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Help political prisoners.</p>
        </div>
        <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <p>Declare your love.</p>
        </div>
        </div>
        <br/>
        <div className="my-8 text-2xl font-bold text-center">
          <h2>
            The MXM Advantage
          </h2>
          <br/>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-8 mx-auto font-thin">
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-3 w-3 flex-shrink-0 mr-4"></div>
            <p>Free promotion of your message.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-3 w-3 flex-shrink-0 mr-4"></div>
            <p>Ownership of prime digital real estate.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-3 w-3 flex-shrink-0 mr-4"></div>
            <p>50% profit share on price increase.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-3 w-3 flex-shrink-0 mr-4"></div>
            <p>Permanent blockchain record.</p>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-white rounded-full h-3 w-3 flex-shrink-0 mr-4"></div>
            <p>Archive preservation of all messages.</p>
        </div>
        </div>
        <div onClick={() => window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
                })} 
            className="bg-black bg-opacity-50 p-8 rounded-xl border border-purple-800 mx-10 transition duration-500 ease-in-out hover:bg-purple-950 hover:border-purple-500 hover:text-white">
                    <h2 className="text-3xl font-bold mb-2">Join the MXM Revolution. <br/> Be part of internet history. <br/> Own the world's Most Expensive Message.</h2>
        </div>
        <br/>
        <div className="my-8 text-xl font-thin">
          <p>
            How high will the price soar?
          </p>
          <br/>
        </div>
        <div className="my-8 text-xl font-thin">
          <p>
            What will the ultimate message say?
          </p>
          <br/>
        </div>
        <div className="my-8 text-xl font-thin">
          <p>
            Who will claim this digital landmark?
          </p>
          <br/>
        </div>

        <div className="my-8 text-xl font-thin">
            <p>
                The answers are up to you.
            </p>
            <br/>
        </div>
        <div className="bg-opacity-50 rounded-xl">
            <h2 className="text-3xl font-bold mb-2">Ready to Make Your Mark?</h2>
            <p className="text-xl">Embrace the World's Most Expensive Message.
            Own it.
            Profit from its impact.</p>
            <p>Claim it. Share it. Change the world.</p>
        </div><br/>
        <div className="my-8 text-lg font-light">
        <p>The Most Expensive Message: <i>where free speech is rewarded.</i></p>
        </div>
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