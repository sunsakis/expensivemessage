import Link from 'next/link';

export default function Footer( { price } ) {

    return (
        <div className="absolute bottom-1 left-0 right-0">
            <div className="">
                <p className="text-sm text-right tracking-tight mr-9 text-gray-300">
                        Current MXM
                    </p>
                    <p className="text-right mr-9">
                        <b className="text-2xl">
                        {price} ETH
                        </b>
                    </p>
                    <div className="flex justify-end mx-auto">
                    <button className="w-full sm:w-auto">
                        <Link href="/wtf">
                            <p className="sm:px-5 m-3 p-3 mx-9 font-semibold bg-white text-black hover:bg-slate-100 rounded-xl">
                                Claim the MXM
                            </p>
                        </Link>
                    </button>
                </div>
            </div>
                <div className="flex justify-center mx-auto m-1">
                    <p className="text-xs tracking-tight font-extralight text-left mx-2 text-gray-200">
                        What is the MXM?
                    </p>
                    <p className="text-xs tracking-tight font-extralight text-left mx-2 text-gray-200">
                        Archive
                    </p>
                    <p className="text-xs tracking-tight font-extralight text-left mx-2 text-gray-200">
                        Terms and conditions
                    </p>
                </div>
        </div>
    )
}
