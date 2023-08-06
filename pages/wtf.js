import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/header.js';
import InputField from '../components/input.js';

export default function Wtf() {
  
  return (
    <>
      <Head>
        <title>Expensive Message - Write Internet History (For What It's Worth)</title>
        <meta name="description" content="Become a part of Internet history, even if every message costs $100 more than the previous one." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <InputField />
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-xs sm:max-w-sm md:max-w-md w-[500px] p-4 border rounded-lg whitespace-pre-line break-words text-[1rem] font-mono max-h-[420px] overflow-y-auto">
                    <i>
                        <p class="text-lg">Write internet history.</p><br/>
                        <h1>The goal is to become internet`s most valuable textboard.</h1><br/>
                        <p>Become a part of it - every message costs 0.01 ETH more than the previous one.</p><br/>
                        <p>The posts are stored on the Ethereum blockchain, accessible forever.</p><br/>
                        <p>Contact: sunsakis@proton.me</p>
                    </i>
            </div>
        </div>
      </main>
    </>
  )
}
