import Head from 'next/head'
import Header from '@/components/header'

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-green-900 text-white">
      <Head>
        <title>Terms of Use - Most Expensive Message (MXM) Platform</title>
      </Head>
        <Header />
        <br/>
        <br/>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">MOST EXPENSIVE MESSAGE (MXM) PLATFORM TERMS OF USE</h1>

        <div className="space-y-8">
          {[
            { title: "1. Acceptance", content: "By accessing or using this Platform, you agree to be bound by these Terms of Use and all referenced policies. If you disagree, you may not use the Platform." },
            { title: "2. No Refunds", content: "All transactions are final and non-refundable under any circumstances. You bear full responsibility for your use." },
            { title: "3. Temporary Ad Space Ownership", content: "This Platform facilitates the temporary ownership and sale of digital advertising spaces (\"windows\") to display messages/content online. Window ownership is transferred via smart contract upon purchase, relinquishing all prior ownership rights. You may opt for a commemorative NFT recording your prior ownership period and content, but this does not convey any ongoing rights." },
            { title: "4. AML/KYC Verification", content: "All users must complete anti-money laundering (AML) and know your customer (KYC) checks through an approved vendor: - Verified through Stripe - Chainalysis - Jumio - IdentityMind - Trulioo - Onfido. Failure to successfully verify identity and funds will permanently deny Platform access." },
            { title: "5. Prohibited Jurisdictions", content: "Due to legal/regulatory reasons, the Platform strictly prohibits use by individuals located in: North Korea, Iran, Syria, Cuba, Sudan, Venezuela, Crimea region of Ukraine, or any other jurisdictions added without notice." },
            { title: "6. Not an Investment Platform", content: "This Platform purely facilitates the temporary transfer of online advertising space rental. It does not represent any investment contract, security, financial product, investment scheme, or guarantee of financial returns. Message/window values are set by participants with no guaranteed profits, returns on investment, or appreciation." },
            { title: "7. Intellectual Property", content: "Users represent holding all rights for posted content. You grant us a perpetual, worldwide license to use and modify content for operating the Platform. Unauthorized use is prohibited. We retain all intellectual property rights in the \"Most Expensive Message\" name, branding and Platform. We will terminate accounts upon valid copyright complaints per DMCA or applicable laws." },
            { title: "8. User Conduct & Indemnification", content: "You will use the Platform legally, ethically and in full compliance with these Terms and our content standards aligned with Twitter/X. Prohibited content includes unlawful, defamatory, hateful, explicit or infringing material. You indemnify and hold harmless this Platform, owners, operators, developers, partners and affiliates against any third-party claims from your use." },
            { title: "9. Service Disclaimers", content: "The Platform is provided \"as is\" without warranties. We do not guarantee accessibility, security, or freedom from downtime, errors or data loss, being hacked, or any other situation that results in an adverse effect. To the fullest extent permitted, we disclaim all liability related to your use, including any direct, indirect, consequential or punitive damages. You use this Platform solely at your own risk." },
            { title: "10. Content Removal", content: "We reserve the absolute right to remove any content violating these Terms, our standards or third-party rights, without notice. Repeated violations will result in permanent termination." },
            { title: "11. Identity Protection", content: "To protect privacy and anonymity, we will not disclose any identities or associated information of the Platform's owners, operators or developers under any circumstances, and you undertake to not reveal them if they become known to you." },
            { title: "12. Autonomous Smart Contracts", content: "We do not directly administer or participate in the Platform's autonomous smart contract operations besides providing the initial code. Transactions occur automatically with no interference ability." },
            { title: "13. Limitation of Liability", content: "Under no circumstances, including negligence, shall the owners/operators/developers be liable for damages related to smart contract operations, bugs, hacks, failures or disruptions. Use indicates your agreement that liability is limited to the fullest extent under Estonian law." },
            { title: "14. Most Expensive Name", content: "We make no guarantees or warranties that Platform messages constitute the actual \"most expensive\" message in existence. This is simply the branded name for this service." },
            { title: "15. Commemorative NFT (Optional)", content: "You may choose to receive an optional NFT providing a record of your prior window ownership period/content. This does not convey rights - it is solely commemorative. You are responsible for any gas fees." },
            { title: "16. Governing Law & Dispute Resolution", content: "These Terms shall be governed by Estonian law. Any disputes must be resolved through binding arbitration in Estonia." },
            { title: "17. Agreement", content: "By checking below or using this Platform, you accept the most current version of these Terms of Use." },
          ].map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-8">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>I accept the Terms of Use</span>
          </label>
        </div>
      </main>
    </div>
  )
}