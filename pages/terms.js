import Head from 'next/head'
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
import ABI from '../contract/ABI.js';


export default function TermsOfUse({ newestPrice, settings }) {
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
        <title>Terms of Use</title>
        <meta name="description" content="Expensive Message Platform Terms of Use" />
        <link rel="icon" href="/favicon
        .ico" />
      </Head>
        <Header />
        <br/>
        <br/>
        <br/>
        <br/>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">EXPENSIVE MESSAGE PLATFORM TERMS OF USE</h1>
        <div className="space-y-8">
          {[
            { title: "1. Acceptance", content: "By accessing or using this Platform, you agree to be bound by these Terms of Use and all referenced policies. If you disagree, you may not use the Platform." },
            { title: "2. No Refunds", content: "All transactions are final and non-refundable under any circumstances. You bear full responsibility for your use." },
            { title: "3. Temporary Ad Space Ownership", content: "This Platform facilitates the temporary ownership and sale of digital advertising spaces ('windows') to display messages/content online. Window ownership is transferred via smart contract upon purchase, relinquishing all prior ownership rights. We keep a version of your previous display in our previous owners gallery." },
            { title: "4. AML/KYC Verification", content: "4.1 All users must complete anti-money laundering (AML) and know your customer (KYC) checks through an industry recognised vendor, legally recognised as such in your own jurisdiction. 4.2. You specifically confirm that you have completed this verification successfully. 4.3. When you click that you have read and accept the terms and conditions you indemnify us completely and confirm you have accepted them in totality." },
            { title: "5. Prohibited Jurisdictions", content: "5.1. Due to legal/regulatory reasons, the Platform strictly prohibits use by individuals located in: North Korea, Iran, Syria, Cuba, Sudan, Venezuela, Crimea region of Ukraine, or any other jurisdictions added without notice. 5.2. U.S. citizens are not permitted to use this platform unless they have obtained specific legal approval to do so. 5.3. Users are solely responsible for ensuring their use of the Platform complies with all applicable local, state, and national laws in their jurisdiction." },
            { title: "6. Not an Investment Platform", content: "This Platform purely facilitates the temporary transfer of online advertising space rental. It does not represent any investment contract, security, financial product, investment scheme, or guarantee of financial returns, or anything that may be construed to be similar or for similar intentions. Message/window values are set by participants above a smart contract enforced minimum with no guaranteed profits, returns on investment, or appreciation." },
            { title: "7. Intellectual Property", content: "Users represent holding all rights for posted content. You grant us a perpetual, worldwide license to use and modify content for operating the Platform. Unauthorized use is prohibited. We retain all intellectual property rights in the 'Expensive Message' name, branding and Platform. We will terminate accounts upon valid copyright complaints per DMCA or applicable laws.  " },
            { title: "8. User Conduct & Indemnification", content: "You will use the Platform legally, ethically and in full compliance with these Terms and our content standards aligned with X. Prohibited content includes unlawful, defamatory, hateful, explicit or infringing material. You indemnify and hold harmless this Platform, owners, operators, developers, partners and affiliates against any third-party claims from your use." },
            { title: "9. Service Disclaimers", content: "The Platform is provided 'as is' without warranties. We do not guarantee accessibility, security, or freedom from downtime, errors or data loss, being hacked, or any other situation that results in an adverse effect. To the fullest extent permitted, we disclaim all liability related to your use, including any direct, indirect, consequential or punitive damages. You use this Platform solely at your own risk." },
            { title: "10. Content Removal", content: "We reserve the absolute right to remove any content violating these Terms, our standards or third-party rights, without notice, with any profits accruing to you to be confiscated for violating the terms and conditions herewith." },
            { title: "11. Identity Protection", content: "To protect privacy and anonymity, we will not disclose any identities or associated information of the Platform's owners, operators or developers under any circumstances, and you undertake to not reveal them if they become known to you.  You agree that you will be held liable for personal damages should you do so." },
            { title: "12. Autonomous Smart Contracts", content: "We do not directly administer or participate in the Platform's autonomous smart contract operations besides providing the initial code. Transactions occur automatically with no interference ability." },
            { title: "13. Limitation of Liability", content: "Under no circumstances, including negligence, shall the owners/operators/developers be liable for damages related to smart contract operations, bugs, hacks, failures or disruptions, or any negative user experience. Use indicates your agreement that liability is limited to the fullest extent under Estonian law.  There is no end date to this clause." },
            { title: "14. Expensive Message Name", content: "We make no guarantees or warranties that Platform messages constitute the actual 'most expensive' message in existence. This is simply the branded name for this service." },
            { title: "15. Force Majeur", content: "All normally recognised force majeur exclusions apply." },
            { title: "16. Agreement", content: "By checking below and/or using this Platform, you accept the most current version of these Terms of Use." },
            { title: "17. Updates to Terms", content: "18.1. We reserve the right to update these Terms of Use at any time. 18.2. Any changes will be effective immediately upon posting to the Platform. 18.3. Your continued use of the Platform after changes are posted constitutes your acceptance of the updated Terms. 18.4. We will make reasonable efforts to notify users of significant changes via social or platform notification."},
            { title: "18. Severability", content: "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable."},
            { title: "19. Governing Law & Dispute Resolution", content: "These Terms shall be governed by Estonian law. Any disputes must be resolved through binding arbitration in Estonia." },
          ].map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer msgPrices={newestPrice} text={""} settings={settings}/>
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