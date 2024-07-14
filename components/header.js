import Link from 'next/link';
import Image from 'next/image';

export default function Header() {

    return (
            <div className="m-10 fixed top-6 left-9">
                <Link href="/">
                <button className="flex">
                    <Image
                        src="/color_icon.svg"
                        alt="Expensive Message logo"
                        width={75}
                        height={75}
                    />
                    <b className="mt-4 text-xl">Most eXpensive Message</b>
                </button>
                </Link>
            </div>
    )
}
