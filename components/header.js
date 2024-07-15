import Link from 'next/link';
import Image from 'next/image';

export default function Header() {

    return (
            <div className="m-2 absolute top-5 left-5">
                <Link href="/">
                <button className="flex">
                    <Image
                        src="/color_icon.svg"
                        alt="Expensive Message logo"
                        width={50}
                        height={50}
                    />
                    <b className="m-1 text-2xl">MXM</b>
                </button>
                </Link>
            </div>
    )
}
