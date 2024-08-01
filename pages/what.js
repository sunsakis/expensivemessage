import Head from 'next/head'
import Header from '@/components/header'
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
        }}
        className="text-white px-4 sm:px-6 lg:px-8" // Adjust padding based on screen size
    >
    <Head>
        <title>The Most Expensive Message - free speech rewarded.</title>
        <meta name="description" content="Bid, Share, Profit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Header />
    <br/><br/><br/><br/>
    <main className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto my-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            The Most Expensive Message - free speech rewarded.
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
        <div className="grid grid-cols-1 gap-4 mb-8 w-96 mx-auto">
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
        </div>
      </main>
      <footer className="bg-opacity-75 p-4 mt-8 bottom-0 absolute">
  <div className="max-w-4xl mx-auto flex justify-between items-center space-x-5">
    <div className="text-white">
      <Link href="/what">
        <p className="text-gray-200 hover:text-gray-400">What is MXM?</p>
      </Link>
    </div>
    <div className="text-white">
      <Link href="/terms">
        <p className="text-gray-200 hover:text-gray-400">Terms and Conditions</p>
      </Link>
    </div>
  </div>
</footer>
    </div>
  )
}