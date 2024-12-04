import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
import ABI from '../contract/ABI.js';

export default function What({ newestPrice }) {

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
        <title>What Is Expensive Message?</title>
        <meta name="description" content="Free speech for profit." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <br/><br/><br/><br/>
    <Header />
    <main className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto my-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-left">
            Expensive Message: A Revolutionary Social Experiment
        </h1>
        <br/>
        <i className="block text-left">A platform to profit from free speech.</i>
        <br/>
        <p className="text-2xl font-thin mb-8 mt-4">
          Upload messages on-chain. 
          <br/>
          Monetize your voice. 
          <br/>
          Make a splash.
          <br/>
          Profit.
        </p>
        <br/>

        <div className="my-8 text-xl font-bold text-left">
          <h3>
            How it works:
          </h3>
          <br/>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8 mx-auto px-10">
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">Message Cost</h3>
            <p>Price starts out small with petty increases (2¢ → 3¢ → 4¢...) until we hit 10¢. Then we jump by tens until 100¢, by hundreds until 1000¢, and so keep scaling up.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">Outbidding</h3>
            <p>When someone posts a message after you, you earn 5% to 50% of profit, depending on the new price.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">The Spotlight</h3>
            <p>If no one outbids you, you are the owner of the world's most Expensive Message.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h3 className="text-3xl font-bold mb-2">Eternal Glory</h3>
            <p>Stay in this spot for 7 days and you will be indoctrinated into the Hall of Fame.</p>
          </div>
        </div>
        <br/>

        <div className="my-8 text-xl font-bold text-center">
          <h3>
            Your Space for:
          </h3>
          <br/>
        </div>
        <div className="gap-4 mb-8 mx-auto font-thin max-w-xl grid grid-flow-row">
            <div className="text-center bg-opacity-50 mx-auto rounded-xl space-y-3 sm:space-y-0 flex flex-col sm:flex-row" style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'hidden', maxWidth: '100%' }}>
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
                  <p className="text-white font-medium hover:text-purple-200">Memes</p>
                </div>
                <div className="bg-cyan-700 p-5 rounded-lg">
                  <p className="text-white font-medium hover:text-purple-200">Fame</p>
                </div>
                <div className="bg-green-600 p-5 rounded-lg">
                  <p className="text-white font-medium hover:text-purple-200">Profit</p>
                </div>
            </div>   
        </div>
        <br/>
        <br/>
        <div className="grid grid-cols-2 gap-5 mb-8 mx-auto font-thin px-5">
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Become famous for 15 min</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Earn profit on price increase</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Have your message seen</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Own prime digital real estate</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Blockchain permanence</p>
          </div>
          <div className="justify-center bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800 flex items-center">
              <p>Hall of Fame 😎</p>
          </div>
        </div>
        <br/>

      
        <div 
            className="bg-white w-full text-black text-center p-8 rounded-xl border border-green-950 transition duration-500 ease-in-out"
          >
          <h2 className="text-3xl font-bold py-5">
            Ready to Make Your Mark?
            <br/> 
            <span className="font-thin text-2xl">
              Be part of internet history.
            </span> 
            <br/> 
            <span className="font-light text-2xl">
              Own Expensive Message.
            </span>
          </h2>
        <br/>
        <br/>
        <p className="text-xl font-thin">How high will the price soar?</p>
        <br/>
        <p className="text-xl font-thin">What will the ultimate message say?</p>
        <br/>
        <p className="text-xl font-bold">The answer is up to you.</p>
        <p className="text-xl font-bold bg-gradient-to-r from-purple-800 to-blue-300 bg-clip-text text-transparent">
            Claim it. Share it. 
        </p>
        </div>
        <div className="my-8 text-sm text-center font-light">
        <p>Expensive Message: <i>free speech for profit.</i></p>
        </div>
      </main>
      <Footer msgPrices={newestPrice} text={"Last"} />
    </div>
  )
}

export async function getServerSideProps() {

    const settings = {
      apiKey: process.env.ALCHEMY_API,
      network: Network.BASE_MAINNET,
    };
  
    const ethersProvider = new ethers.providers.JsonRpcProvider("https://mainnet.base.org");
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_FRONTPAGE, ABI, ethersProvider);
    const newestPrice = await contract.getPrice();
    const formatPrice = parseFloat(ethers.utils.formatEther(newestPrice)).toString();
  
    return {
      props: {
        newestPrice: formatPrice,
      },
      //revalidate: 1,
    };
  }