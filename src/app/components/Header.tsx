'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation';

export function Header() {

    const pathname = usePathname()

    return(
        <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
            <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul className="flex flex-col text-2xl p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link href="/" className={pathname === '/' ? 'text-blue-500' : 'text-gray-900' + `block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Home</Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className={pathname === '/dashboard' ? 'text-blue-500' : 'text-gray-900' + `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Publish</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}