import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { verifyToken } from '../../apis/apis';
import CustomCard from '../custom/CustomCard'

function Verify() {
    const { token } = useParams();
    useEffect(() => {
        if (token)
            verifyToken(token)
    }, [token])
    return (
        <CustomCard
            className='h-[calc(100%-64px)] w-full flex flex-col items-center justify-center'
        >
            <div className='text-3xl leading-none underline underline-offset-8 mb-2'>Guess The Color</div>
            <div className='text-xl leading-none my-6 tracking-wider'>Email verified successfully!</div>
            <div className='flex gap-1 items-center text-lg leading-none tracking-wider'>
                <Link to={'/login'} className='text-green-400'>Login</Link> to continue
            </div>
        </CustomCard>
    )
}

export default Verify