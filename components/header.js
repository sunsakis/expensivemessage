import Link from 'next/link';
import Image from 'next/image';

export default function Header( { price } ) {

    return (
        <nav className="flex fixed top-0 w-[350px] sm:w-[600px] bg-[#D6DBDC]/80 dark:bg-black">
            <div className="m-2 relative">
                <Link href="/">
                <button>
                    <Image
                        src="/expensivemessagelogo.png"
                        alt="Expensive Message logo"
                        width={35}
                        height={35}
                        className="sm:w-10 sm:h-10 cursor-pointer hover:rotate-90 transform-all duration-500"
                    />
                </button>
                </Link>
            </div>
            <Link href="/wtf">
            <div className="m-2 p-2 mb-4 top-0 absolute right-0 border rounded-md">
                <p className="font-mono text-sm tracking-tight sm:text-lg md:text-sm">
                    <b>
                    <span className="text-matrix">Ξ</span>
                    {price} ETH
                    </b>{" "}
                    FOR 1 MESSAGE
                </p>
            </div>
            </Link>
        </nav>
    )
}
