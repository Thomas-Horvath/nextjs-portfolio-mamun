'use client';

import { Bars3Icon, MoonIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SunIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Blog', href: '/blogs' },
        { label: 'Contact', href: '/contact' },
    ];


    return (
        <nav className='fixed w-full bg-white/80 dark:bg-dark/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700 transition-colors shadow-sm'>
            <div className="container max-w-7xl mx-auto px-4">


                {/* desktop menu */}
                <div className="flex items-center justify-between h-16">
                    <Link href="/" onClick={closeMobileMenu} className='text-xl font-bold text-primary' >Devfolio&trade;</Link>


                    <div className='hidden md:flex items-center space-x-8'>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link href={item.href} key={item.href}
                                    className={`hover:text-primary transition-colors cursor-pointer ${isActive ? 'text-primary' : ''}`}>
                                    {item.label}
                                </Link>
                            )
                        })}

                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-lg hover:bg-gray-100 dark:text-white cursor-pointer hover:text-primary dark:hover:bg-gray-800 transition-colors'>
                            {theme === 'dark' ? (
                                <SunIcon className='w-5 h-5' />
                            ) : (
                                <MoonIcon className='w-5 h-5' />
                            )}
                        </button>
                    </div>


                    {/** mobile menu button */}

                    <button
                        onClick={toggleMobileMenu}
                        className='md:hidden p-2 rounded-lg hover:bg-gray-100 text-primary dark:hover:bg-gray-800 transition-colors cursor-pointer'
                    >
                        {
                            isMobileMenuOpen ? (
                                <XMarkIcon className='w-6 h-6' />
                            ) : (
                                <Bars3Icon className='w-6 h-6' />
                            )

                        }
                    </button>
                </div>





                {/* mobile menu */}


                {isMobileMenuOpen && (
                    <div className='md:hidden'>
                        <div className='py-4 space-y-4'>
                            {menuItems.map((item, index) => (
                                <div key={index} onClick={toggleMobileMenu}>
                                    <Link href={item.href} className='block py-2 hover:text-primary transition-colors'>{item.label}</Link>
                                </div>
                            ))}
                            <div>
                                <button
                                    onClick={toggleTheme}
                                    className='flex items-center py-2  hover:text-primary cursor-pointer transition-colors'>
                                    {theme === 'dark' ? (
                                        
                                      <><SunIcon className='w-5 h-5 mr-2' /> Light</>  
                                    ) : (
                                      <><MoonIcon className='w-5 h-5 mr-2' /> Dark</>  
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )
                }



            </div>
        </nav>
    )
}

export default Navbar