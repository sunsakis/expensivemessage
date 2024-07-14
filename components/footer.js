import Link from 'next/link';

export default function Footer( { price } ) {

    return (
        <div>
            <div className="bottom-9 absolute left-14">
                <div className="flex">
                    <p className="text-sm tracking-tight font-extralight text-left mx-2 text-gray-200">
                        What is the MXM?
                    </p>
                    <p className="text-sm tracking-tight font-extralight text-left mx-2 text-gray-200">
                        Terms and conditions
                    </p>
                </div>
            </div>
            <div className="bottom-8 absolute right-14">
                <p className="text-sm tracking-tight font-thin text-right mr-2 text-gray-300">
                    Current MXM price:
                </p>
                <p className="text-right mr-2">
                    <b className="text-3xl">
                    Ξ{price}
                    </b>
                </p>
                <button>
                    <Link href="/wtf">
                        <p className="m-2 p-3 px-4 font-semibold bg-white text-black hover:bg-slate-100 rounded-xl">
                            Claim the MXM
                        </p>
                    </Link>
                </button>
            </div>
        </div>
    )
}
