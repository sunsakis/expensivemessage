import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Header() {

    const router = useRouter();
    const ref = useRef(null);
    const [lottie, setLottie] = useState(null);

    useEffect(() => {
        import('lottie-web').then((lot) => { setLottie(lot.default) });
    }, []);

    useEffect(() => {
        if (lottie && ref.current) {
            const animation = lottie.loadAnimation({
                container: ref.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: 'MXM_lottie.json',
            });

        return () => animation.destroy()
        }
    },[lottie])

    return (
        <>
            <div className="flex">
                <button>
                    <div className="m-2 absolute top-5 left-5 z-10" ref={ref} onClick={() => {
                        // Check if the current path is not the homepage
                        if (router.pathname !== '/') {
                            router.push('/');
                        }
                        }}>
                    </div>
                </button>
            </div>
        </>
    )
}
