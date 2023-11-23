import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomCard from '../custom/CustomCard'
import gtclogo from '../../assets/gtclogo.png'
import { MdDarkMode } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import classNames from 'classnames'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser, isDark, setIsDark } = useContext(AppContext);
    useEffect(() => { }, [user])
    const [openSidebar, setOpenSidebar] = useState(false);

    const closeMobileNavbar = () => {
        setOpenSidebar(false);
    };

    const mobileNavbar = (
        <div className={classNames(
            'absolute top-0 right-0 bottom-0 w-4/5 xs:w-2/3 sm:w-1/2 z-20 flex flex-col gap-4 items-center justify-start py-20',
            isDark ? 'bg-gray-100 text-gray-800' : 'bg-[#0a2846] text-gray-100',
        )}>
            <Link
                onClick={closeMobileNavbar}
                to={'/'}
                className='tracking-wide text-2xl'
            >Home</Link>
            <Link
                onClick={closeMobileNavbar}
                to={'/leaderboard'}
                className='tracking-wide text-2xl'
            >Leaderboard</Link>
            {user
                ? <Link
                    onClick={closeMobileNavbar}
                    to={'/mode/user'}
                    className='tracking-wide text-2xl'
                >Play</Link>
                : <Link
                    onClick={closeMobileNavbar}
                    to={'/login'}
                    className='tracking-wide text-2xl'
                >Login</Link>
            }
            {user
                ? <div
                    className='tracking-wide text-2xl cursor-pointer'
                    onClick={() => {
                        setUser(null)
                        localStorage.removeItem("user")
                        navigate("/login")
                        setOpenSidebar(false)
                    }}
                >Logout</div>
                : <Link
                    to={'/register'}
                    className='tracking-wide text-2xl'
                    onClick={closeMobileNavbar}
                >Register</Link>
            }
            <MdDarkMode
                className={classNames('text-3xl cursor-pointer', isDark ? 'text-blue-700' : 'text-blue-200')}
                onClick={() => setIsDark(!isDark)}
            />
            <div className='absolute bottom-0 left-0 right-0 px-2 py-4 text-lg border-t border-t-gray-400 text-center'>Guess The Color</div>
        </div>
    )

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const handleScreenSizeChange = (e) => {
            if (e.matches) {
                setOpenSidebar(false);
            }
        };
        mediaQuery.addListener(handleScreenSizeChange);
        return () => {
            mediaQuery.removeListener(handleScreenSizeChange);
        };
    }, []);

    return (
        <CustomCard className='min-h-[64px] h-16 bg-transparent flex items-center justify-between px-4 xs:px-8 border-b border-gray-600'>
            <img src={gtclogo} alt={'GTC'} className='h-10 w-auto rounded' />
            <div className='flex gap-4 items-center'>
                {user
                    ? <div className='cursor-pointer text-lg tracking-wide block md:hidden'>{user?.username}</div>
                    : null
                }
                <RxHamburgerMenu
                    className={classNames(
                        'flex md:hidden text-2xl cursor-pointer z-30',
                        openSidebar
                            ? isDark
                                ? 'text-gray-800'
                                : 'text-white'
                            : isDark
                                ? 'text-white'
                                : 'text-gray-800'
                    )}
                    onClick={() => setOpenSidebar(!openSidebar)}
                />
            </div>
            {openSidebar ? mobileNavbar : null}
            <div className='w-fit gap-6 items-center hidden md:flex'>
                <MdDarkMode
                    className={classNames('scale-125 cursor-pointer', isDark ? 'text-blue-600' : 'text-blue-400')}
                    onClick={() => setIsDark(!isDark)}
                />
                <Link
                    to={'/'}
                    className={classNames(
                        'tracking-wide text-xl',
                        isDark ? 'text-gray-200' : 'text-blue-950'
                    )}
                >Home</Link>
                <Link
                    to={'/leaderboard'}
                    className={classNames(
                        'tracking-wide text-xl',
                        isDark ? 'text-gray-200' : 'text-blue-950'
                    )}
                >Leaderboard</Link>
                {user
                    ? <Link
                        to={'/mode/user'}
                        className={classNames(
                            'tracking-wide text-xl',
                            isDark ? 'text-gray-200' : 'text-blue-950'
                        )}
                    >Play</Link>
                    : <Link
                        to={'/login'}
                        className={classNames(
                            'tracking-wide text-xl',
                            isDark ? 'text-gray-200' : 'text-blue-950'
                        )}
                    >Login</Link>
                }
                {user
                    ? <div
                        className='text-gray-200 tracking-wide text-xl cursor-pointer'
                        onClick={() => {
                            setUser(null)
                            localStorage.removeItem("user")
                            navigate("/login")
                        }}
                    >Logout</div>
                    : <Link
                        to={'/register'}
                        className={classNames(
                            'tracking-wide text-xl',
                            isDark ? 'text-gray-200' : 'text-blue-950'
                        )}
                    >Register</Link>
                }
            </div>
        </CustomCard>
    )
}

export default Navbar