import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'

export default function What() {
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
        display: 'flex',
        boxSizing: 'border-box', // Include padding and border in the width calculation
    }}
    className="text-white px-4 sm:px-6 lg:px-8" // Adjust padding based on screen size
    >
    <Head>
        <title>Most Expensive Message | MXM</title>
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
        <div className="grid grid-rows-1 gap-4 mb-8 mx-auto font-thin">
            <div className="bg-black bg-opacity-50 p-8 mx-auto rounded-xl border border-gray-800 flex items-center text-center space-x-5">
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
            <p>Champion human rights</p>
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
        <div className="bg-green-500 bg-opacity-50 p-8 rounded-xl border border-green-800 mx-10">
            <h2 className="text-3xl font-bold mb-2">Join the MXM Revolution</h2>
            <p className="text-xl">Be part of history.</p>
            <p>Own the world's Most eXpensive Message.</p>
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
        <div className="bg-opacity-50 p-8 rounded-xl mx-10">
            <h2 className="text-3xl font-bold mb-2">Ready to Make Your Mark?</h2>
            <p className="text-xl">Embrace the World's Most Expensive Message.
            Own it.
            Profit from its impact.</p>
        </div>
        <div className="my-8 text-xl font-thin text-center">
        <i className="text-center mx-auto">The Most Expensive Message: Free speech rewarded.</i>
        </div>
      </main>
      <Footer />
    </div>
  )
}