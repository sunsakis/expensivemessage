import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css'

export default function Header() {
    return (
        <nav class="flex absolute top-0 m-2 w-[350px] sm:w-[600px]">
            <div class="m-2">
                <Image
                    src="/expensivemessage.png"
                    alt="Expensive Message logo"
                    width={35}
                    height={35}
                    class="sm:w-10 sm:h-10"
                />
            </div>
            <Link href="/">
            <div class="m-2 p-2 absolute top-0 right-0 border rounded-md">
                    <p class="font-mono text-xs tracking-tight sm:text-lg md:text-sm">
                    
                    <b> <span class="text-matrix">$</span>100</b> FOR 1 MESSAGE</p>
                    </div>
            </Link>
            
        </nav>
    )
}
