import classNames from 'classnames';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'

import play1 from '../../assets/play1.png'
import play4 from '../../assets/play4.png'

function Homepage() {

    const { user, isDark } = useContext(AppContext);

    useEffect(() => { }, [user])

    return (
        <div className='flex flex-col justify-start py-6 sm:py-0 gap-4 items-center sm:justify-center h-[calc(100%-64px)] w-full'>
            <div className='flex flex-col items-center justify-center gap-4 md2:gap-2 border-b border-b-gray-600 pb-4'>
                <div className='text-3xl xs:text-4xl md:text-5xl font-medium leading-none'>Guess The Color</div>
                <div className='text-lg tracking-wide'>Your go-to CSS game!</div>
            </div>
            {user
                ? <div className={classNames(
                    'text-2xl font-medium tracking-wider',
                    isDark ? 'text-green-300' : 'text-blue-700'
                )}>Welcome {user?.username}!</div>
                : <div className='flex items-center gap-3'>
                    <Link
                        to={'/mode/guest'}
                        className='bg-green-600 px-6 text-lg leading-none py-2 rounded text-gray-100'
                    >Guest</Link>
                    <Link
                        to={'/login'}
                        className='bg-green-600 px-6 text-lg leading-none py-2 rounded text-gray-100'
                    >Login</Link>
                </div>
            }
            <div className='flex flex-col gap-3 items-center mt-6'>
                <div className='text-xl'>This is how the game looks ⬇️</div>
                <div className='flex flex-col md:flex-row gap-3 items-center'>
                    <img src={play1} alt="RGB" className='h-56 w-72 border border-gray-200 rounded' />
                    <img src={play4} alt="HEX" className='h-56 w-72 border border-gray-200 rounded' />
                </div>
            </div>
        </div>
    )
}

export default Homepage