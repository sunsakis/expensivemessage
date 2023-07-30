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
            <div className="max-w-xs sm:max-w-sm md:max-w-md w-[500px] p-4 border rounded-lg">
                <p className="whitespace-pre-line break-words text-[1rem] font-mono max-h-[420px] overflow-y-auto">
                    <i>
                        <h1 class="text-lg">Write internet history.</h1><br/>
                        <p>You can become a part of internet history, though every message costs 0.1 ETH more than the previous one.</p><br/>
                        <p>When anyone can write anything, the important messages get lost.</p><br/>
                        <p>Collected Ether will be used to develop a social web3 info point. Get in early.</p><br/>
                        <p>Contact: teo@expensivemessage.com</p>
                    </i>
                </p>
            </div>
        </div>
      </main>
    </>
  )
}
