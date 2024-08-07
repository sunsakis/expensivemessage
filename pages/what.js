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
            backgroundPosition: 'right',
            }}
            className="text-white px-4 sm:px-6 lg:px-8" // Adjust padding based on screen size
    >
    <Head>
        <title>What Is The MXM? | MXM</title>
        <meta name="description" content="Free speech rewarded." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <br/><br/><br/><br/>
    <Header />
    <main className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto my-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-left">
            The Most Expensive Message (MXM): A Revolutionary Socialfi Experiment
        </h1>
        <br/>
        <i className="block text-left">Discover MXM - where free speech is rewarded.</i>
        <br/>
        <p className="text-2xl font-thin mb-8 mt-4">
        Welcome to the MXM, a groundbreaking Socialfi platform that empowers you to monetize your voice and make a global impact.
        </p>
        <br/>

        <div className="my-8 text-xl font-bold text-left">
          <h3>
            How MXM Works:
          </h3>
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

        <div className="my-8 text-xl font-bold text-center">
          <h3>
            MXM is Your Platform for:
          </h3>
          <br/>
        </div>
        <div className="gap-4 mb-8 mx-auto font-thin max-w-xl grid grid-flow-row">
            <div className="text-center bg-opacity-50 mx-auto rounded-xl sm:space-x-2 space-y-3 sm:space-y-0 flex flex-col sm:flex-row" style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'hidden', maxWidth: '100%' }}>
                <div className="bg-fuchsia-700 p-5 rounded-lg">
                  <p className="text-white font-medium hover:text-purple-200">Influence</p>
                </div>
                <div className="bg-purple-700 p-5 rounded-lg">
                  <p className="text-white font-medium hover:text-purple-200">Advocacy</p>
                </div>
                <div className="bg-indigo-700 p-5 rounded-lg">
                  <p className="text-white font-medium hover:text-purple-200">Celebration</p>
                </div>
                <div className="bg-sky-700 p-5 rounded-lg">
                  <p className="text-white font-medium hover:text-purple-200">Business</p>
                </div>
                <div className="bg-cyan-700 p-5 rounded-lg">
                  <p className="text-white font-medium hover:text-purple-200">Promises</p>
                </div>
            </div>   
        </div>
        <br/>

        <div className="font-bold my-8 text-xl">
          <h3 className="text-left">
            Why Choose MXM?
          </h3>
        </div>
        <br/>
        <div className="grid grid-cols-2 gap-5 mb-8 mx-auto font-thin px-5">
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Monetize your message while influencing the world.</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Gain exposure through our free promotion.</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Profit from the rising value of digital real estate.</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Secure blockchain-backed permanence for your statement.</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Promotion of your message.</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Ownership of prime digital real estate.</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>50% profit share on price increase.</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Preservation of all messages.</p>
          </div>
        </div>
        <br/>

        <div className="my-8 text-xl font-bold text-center">
          <h3>
            Innovative Ways to Leverage MXM:
          </h3>
          <br/>
        </div>
        <div className="gap-4 mb-8 mx-auto font-thin w-3/4 grid grid-cols-2 text-center">
          <div className="bg-indigo-700 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Announce investments</p>
          </div>
          <div className="bg-sky-600 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Celebrate partnerships</p>
          </div>
          <div className="bg-sky-700 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Champion human rights</p>
          </div>
          <div className="bg-cyan-600 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Promote free speech</p>
          </div>
          <div className="bg-cyan-700 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Help political prisoners</p>
          </div>
          <div className="bg-teal-500 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Launch projects</p>
          </div>
          <div className="bg-teal-600 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Showcase art</p>
          </div>
          <div className="bg-emerald-400 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Expose corruption</p>
          </div>
          <div className="bg-emerald-500 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Fight oppression</p>
          </div>
          <div className="bg-green-400 p-5 rounded-lg flex-grow">
              <p className="text-white font-medium hover:text-purple-200">Declare your love</p>
          </div>
        </div>
        <br/>
      
        <div 
            className="bg-white w-full text-black text-center p-8 rounded-xl border border-green-950 transition duration-500 ease-in-out">
                    <h2 className="text-3xl font-bold py-5">Ready to Make Your Mark?<br/> <span className="font-thin text-2xl">Be part of internet history.</span> <br/> <span className="font-light text-2xl">Own the world's Most Expensive Message.</span></h2>
        <br/>
        <br/>
        <p className="text-xl font-thin">How high will the price soar?</p>
        <br/>
        <p className="text-xl font-thin">What will the ultimate message say?</p>
        <br/>
        <p className="text-xl font-thin">Who will claim this digital landmark?</p>
        <br/>
        <p className="text-xl font-bold">The answers are up to you.</p>
        <p className="text-xl font-bold bg-gradient-to-r from-purple-800 to-blue-300 bg-clip-text text-transparent">
            Claim it. Share it. Change the world.
        </p>
        </div>
        <div className="my-8 text-lg text-center font-light">
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
      network: Network.ETH_MAINNET,
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