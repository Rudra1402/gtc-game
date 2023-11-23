import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { getLeaderboard } from '../../apis/apis';
import AppContext from '../../context/AppContext';
import CustomCard from '../custom/CustomCard'

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isDark } = useContext(AppContext);

    useEffect(() => {
        setLoading(true)
        getLeaderboard(setLeaderboard, setLoading)
    }, [])

    return (
        <CustomCard
            className='h-full w-full py-8 px-4 md:px-10 lg:px-16 flex flex-col gap-6'
        >
            <div className='text-xl md:text-2xl leading-none underline underline-offset-4'>Leaderboard</div>
            {loading
                ? <div className='text-xl leading-none text-center'>Loading...</div>
                : <div className='flex flex-col gap-3'>
                    {leaderboard?.map((item, index) => (
                        <div
                            className={classNames(
                                'py-2 px-4 rounded flex items-center gap-4 justify-between',
                                isDark ? 'bg-[#fffe] text-gray-800' : 'bg-[#00fb] text-gray-100'
                            )}
                            key={index}
                        >
                            <div
                                className='tracking-wide'
                            >
                                {item?.firstName} {item?.lastName} ({item?.username})
                            </div>
                            <div className='text-lg xs:text-xl leading-nonep'>
                                {item?.highestScore}🔥
                            </div>
                        </div>
                    ))}
                </div>
            }
        </CustomCard>
    )
}

export default Leaderboard