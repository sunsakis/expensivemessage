import Link from 'next/link';
import Image from 'next/image';

export default function Header() {

    return (
            <div className="m-10 fixed top-6 left-9">
                <Link href="/">
                <button className="flex">
                    <Image
                        src="/expensivemessagelogo.png"
                        alt="Expensive Message logo"
                        width={35}
                        height={35}
                        className="sm:w-10 sm:h-10 cursor-pointer hover:rotate-90 transform-all duration-500"
                    />
                    <b className="mt-2">Most Xpensive Message</b>
                </button>
                </Link>
            </div>
    )
}
