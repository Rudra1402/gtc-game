import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getLeaderboard } from '../../apis/apis';
import AppContext from '../../context/AppContext'
import CustomCard from '../custom/CustomCard'

function Sidebar({
    currScore,
    highestScore,
    mode = "guest",
    previousBest,
    leaderboard,
    setLeaderboard
}) {
    const { user, isDark } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                getLeaderboard(setLeaderboard, setLoading);
            } catch (error) {
                console.error('Error updating leaderboard:', error);
            }
        }, 10000);
        return () => clearInterval(intervalId);
    }, [])
    return (
        <CustomCard
            className='h-fit w-full md2:h-full md2:w-1/4 p-2 md2:p-4 flex md2:flex-col flex-col-reverse justify-start border-b border-b-gray-500 md2:border-none'
        >
            {user
                ? <div className='hidden md2:block pb-3 border-b border-b-gray-600 text-lg'>User: {user?.username}</div>
                : null
            }
            <div
                className='text-start py-3 md2:pt-2 md2:pb-4 text-lg leading-none tracking-wide md2:border-b md2:border-b-gray-600'
            >
                Current Streak: {currScore}🔥
            </div>
            {mode != "guest"
                ? <div className='flex flex-col py-3 md2:py-4 border-b border-b-gray-600 md2:border-none gap-4 items-start'>
                    <div
                        className='text-start text-lg leading-none flex items-center gap-2'
                    >
                        Best score <p className='p-2 m-0 bg-blue-500 text-gray-100 rounded'>{highestScore}</p>
                    </div>
                    <div
                        className='text-start text-lg leading-none flex items-center gap-2'
                    >
                        Second best score <p className='p-2 m-0 bg-blue-500 text-gray-100 rounded'>{previousBest}</p>
                    </div>
                </div>
                : <div
                    className='text-start py-3 md2:py-6 border-b border-b-gray-600 md2:border-none tracking-wide text-lg leading-none'
                >
                    <Link
                        to={'/login'}
                        className={classNames(
                            'underline underline-offset-2',
                            isDark ? 'text-green-300' : 'text-blue-600'
                        )}
                    >Login</Link> to track your progress!
                </div>
            }
            <div className='border-t border-t-gray-600 hidden md2:flex flex-col gap-2 flex-1 w-full py-3 overflow-y-auto'>
                <div className='text-lg leading-none pb-2 underline underline-offset-4 tracking-wide'>Active Leaderboard</div>
                {loading
                    ? <div className='p-2 text-lg'>Loading...</div>
                    : leaderboard?.map((user, index) => (
                        <div
                            key={index}
                            className={classNames(
                                'flex items-center justify-between gap-2 px-1.5 py-1 w-full rounded',
                                isDark ? 'bg-white text-gray-700' : 'bg-blue-700  text-gray-100'
                            )}
                        >
                            <div className='tracking-wide'>{user?.username}</div>
                            <div>{user?.highestScore}</div>
                        </div>
                    ))}
            </div>
        </CustomCard>
    )
}

export default Sidebar