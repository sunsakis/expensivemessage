import Link from 'next/link';

export default function Footer( { price } ) {

    return (
        <div className="absolute bottom-1 left-0 right-0">
            <div className="sm:m-5">
                <p className="text-sm text-right tracking-tight mr-9 text-gray-300">
                        Current MXM
                    </p>
                    <p className="text-right mr-8">
                        <b className="text-2xl">
                        {price} ETH
                        </b>
                    </p>
                    <div className="flex justify-end mx-auto">
                    <button className="w-full sm:w-auto mb-12 sm:mb-0">
                        <Link href="/wtf">
                            <p className="sm:px-4 p-3 mt-2 mx-6 font-bold bg-white text-black hover:bg-slate-100 rounded-xl">
                                Claim the MXM
                            </p>
                        </Link>
                    </button>
                </div>
            </div>
            <div className="absolute bottom-1 left-0 right-0 flex mx-auto justify-center sm:justify-start m-2 sm:m-5">
                <div className="flex text-xs sm:text-sm text-gray-200 ml-1">
                    <p className="mx-2">What is the MXM?</p>
                    <p className="mx-2">Archive</p>
                    <p className="mx-2">Terms and conditions</p>
                </div>
            </div>
        </div>
    )
}
