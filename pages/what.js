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
        }}
        className="text-white px-4 sm:px-6 lg:px-8" // Adjust padding based on screen size
    >
    <Head>
        <title>The Most Expensive Message - free speech rewarded.</title>
        <meta name="description" content="Bid, Share, Profit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <br/><br/><br/><br/>
    <Header />
    <main className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto my-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            Free speech is rewarded with the Most Expensive Message.
        </h1>
        <i className="block text-center">Bid, share, profit!</i>
        <p className="text-2xl font-thin sm:text-xl mb-8 mt-4">
            Welcome to the Most Expensive Message (MXM), a unique SocialFi experiment devoted to truth, communication, and freedom.
        </p>
        <p className="mt-4 text-2xl font-thin sm:text-xl mb-8">
            If you own the MXM on our platform you’ll be able to profit from sharing your important message with the world, and we’ll help it get out there.
        </p>
        <div className="my-8 text-2xl font-thin sm:text-xl mb-8">
          <p>
            In a digital landscape of free communication, MXM offers a valuable twist: monetize your message while making an impact.
          </p>
          <br/>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-8 mx-auto">
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-2">1. Bid for Space</h2>
            <p>Secure the MXM by outbidding the previous price paid.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-2">2. Share Your Message</h2>
            <p>From personal declarations to anonymous statements that influence global communities.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-2">3. Profit from Exposure</h2>
            <p>Enjoy the limelight, but when someone takes it from you, you’ll make a profit.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-2">Anonymous influence</h2>
            <p>Reach and impact the world and your communities without necessarily revealing your identity.</p>
          </div>
          <div className="bg-black bg-opacity-50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-2">Social Advocacy</h2>
            <p>Make powerful statements advocating Good. Promotion of Bad is illegal and will not be rewarded.</p>
          </div>
          <div className="bg-green-700 bg-opacity-50 p-8 rounded-xl border border-green-800">
            <h2 className="text-3xl font-bold mb-2 text-purple-200">Join the Revolution</h2>
            <p className="text-purple-50">Own your message. Profit from its power. Welcome to The Most Expensive Message.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}