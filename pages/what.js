import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function What() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 to-black text-white p-8">
      <Head>
        <title>The Most Expensive Message - free speech rewarded.</title>
        <meta name="description" content="Bid, Share, Profit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Header />
    <br/>
    <br/>
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
            The Most Expensive Message - free speech rewarded.
        </h1><br/>
        <i>Bid, share, profit!</i>
        <br/><br/>
        <p className="text-xl mb-8">
            Welcome to the Most Expensive Message (MXM), a unique SocialFi (social finance) experiment devoted to truth, communication and freedom.
        </p>
        <p>
            If you own the MXM on our platform you’ll be able to profit from sharing your important message with the world, and we’ll help it get out there.
        </p>
        <br/>
        <div className="mb-8">
          <p className="mb-4">
            In a digital landscape of free communication, MXM offers a valuable twist: monetize your message while making an impact.
          </p>
        </div><br/>
        <h2 className="text-2xl">How The Most Expensive Message Works:</h2>
        <br/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Bid for Space</h2>
            <p>Secure the MXM by outbidding the previous price paid.</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Share Your Message</h2>
            <p>From personal declarations to anonymous statements that influence global communities.</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Profit from Exposure</h2>
            <p>Enjoy the limelight, but when someone takes it from you, you’ll make a profit.</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Anonymous Influence</h2>
            <p>Reach and impact the world and your communities without revealing your identity.</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Social Advocacy</h2>
            <p>Make powerful statements advocating for equality, justice, and human rights.</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Join the Revolution</h2>
            <p>Own your message. Profit from its power. Welcome to The Most Expensive Message.</p>
          </div>
        </div>
      </main>
      <br/>
      <footer className="text-center mt-8">
        <p>© 2024 The Most Expensive Message. All rights reserved.</p>
      </footer>
    </div>
  )
}