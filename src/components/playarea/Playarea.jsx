import classNames from 'classnames';
import React, { useEffect, useState, useContext } from 'react'
import { updateUserScore } from '../../apis/apis';
import AppContext from '../../context/AppContext';
import CustomCard from '../custom/CustomCard'
import Toast from '../custom/CustomToast'

function Playarea({
    id,
    score,
    setScore,
    mode = "guest",
    setIsScoreUpdated,
    leaderboard,
}) {

    const { isDark } = useContext(AppContext);

    const [type, setType] = useState('')
    const [boxColors, setBoxColors] = useState([]);
    const [selectedBox, setSelectedBox] = useState(null);
    const [isTypeSelected, setIsTypeSelected] = useState(false)
    const [loading, setLoading] = useState(true);

    const createRandomRGB = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const createRandomHEX = () => {
        const hexColor = '#' + (Math.random().toString(16)).substring(2, 8);
        return hexColor;
    };

    const setRGBBoxValues = () => {
        const n = Math.floor(Math.random() * 6);
        setSelectedBox(n);
        const newBoxColors = Array.from({ length: 6 }, () => createRandomRGB());
        setBoxColors(newBoxColors);
        setIsTypeSelected(true)
    };

    const setHexBoxValues = () => {
        const n = Math.floor(Math.random() * 6);
        setSelectedBox(n);
        const newBoxColors = Array.from({ length: 6 }, () => createRandomHEX());
        setBoxColors(newBoxColors);
        setIsTypeSelected(true)
    }

    const handleBoxClick = (boxNumber) => {
        if (boxNumber === selectedBox) {
            setScore(score + 1)
            Toast.success('Correct Answer!')
            if (type == 'rgb')
                setRGBBoxValues()
            if (type == 'hex')
                setHexBoxValues()
        } else {
            if (mode === "user")
                updateUserScore(id, score, setIsScoreUpdated)
            setScore(0)
            Toast.error('Incorrect Answer!')
            setIsTypeSelected(false)
        }
    };

    useEffect(() => { }, [boxColors, selectedBox])

    useEffect(() => {
        if (leaderboard) {
            setLoading(false);
        }
    }, [leaderboard])

    return (
        <CustomCard className='flex flex-col gap-4 justify-start xs:justify-center items-center w-full md2:w-3/4 h-full overflow-y-auto p-4 md2:border-r md2:border-r-gray-300'>
            {isTypeSelected
                ? <div className='flex items-center gap-3 text-xl'>
                    <div>{boxColors[selectedBox]}</div>
                    {/* <div>{answerText}</div> */}
                </div>
                : <div className='flex flex-col items-center gap-6'>
                    <div className='text-2xl tracking-wide font-light'>Select your type</div>
                    <div className='flex items-center gap-4'>
                        <button
                            className='bg-green-600 text-gray-200 px-6 py-2 rounded'
                            onClick={() => {
                                setType('rgb')
                                setRGBBoxValues()
                            }}
                        >RGB</button>
                        <button
                            className='bg-green-600 text-gray-200 px-6 py-2 rounded'
                            onClick={() => {
                                setType('hex')
                                setHexBoxValues()
                            }}
                        >HEX</button>
                    </div>
                </div>
            }
            {isTypeSelected
                ? <div className='flex flex-col gap-3 sm:gap-4'>
                    <div className='flex w-full justify-center gap-3 sm:gap-4 flex-wrap'>
                        {boxColors?.slice(0, 3).map((color, index) => (
                            <div
                                key={index}
                                id={`circle${index + 1}`}
                                className="h-20 w-20 xs:h-24 xs:w-24 sm:h-32 sm:w-32 rounded cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => handleBoxClick(index)}
                            />
                        ))}
                    </div>
                    <div className='flex w-full justify-center gap-3 sm:gap-4 flex-wrap'>
                        {boxColors?.slice(3).map((color, index) => (
                            <div
                                key={index}
                                id={`circle${index + 4}`}
                                className="h-20 w-20 xs:h-24 xs:w-24 sm:h-32 sm:w-32 rounded cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => handleBoxClick(index + 3)}
                            />
                        ))}
                    </div>
                </div>
                : null
            }
            <div className='py-2 tracking-wide'>NOTE: Do not change the screen, else you will lose the current streak!</div>
            <div className='border-t border-t-gray-600 md2:hidden flex flex-col gap-2 flex-1 w-full py-3 overflow-y-auto'>
                <div className='text-lg leading-none pb-2 underline underline-offset-4 tracking-wide'>Active Leaderboard</div>
                {loading
                    ? <div className='p-2 text-lg'>Loading...</div>
                    : leaderboard?.map((user, index) => (
                        <div
                            key={index}
                            className={classNames(
                                'flex items-center justify-between gap-2 px-2 py-1 w-full rounded',
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

export default Playarea