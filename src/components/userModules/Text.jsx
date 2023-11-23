import React from 'react'
import CustomCard from '../custom/CustomCard'

function Text() {
    return (
        <CustomCard
            className='hidden md:flex flex-col gap-2 h-full w-1/2 lg:w-5/12 overflow-y-auto justify-center items-center px-6 lg:px-12 border-r border-r-gray-600'
        >
            <div className='text-2xl mb-6 font-medium leading-none underline underline-offset-[12px]'>Welcome to Guess The Color!</div>
            <div className='flex flex-col gap-2 text-lg'>
                <div>&bull;&nbsp;Are you ready to challenge your color intuition?</div>
                <div>&bull;&nbsp;Let the guessing game begin!</div>
                <div>&bull;&nbsp;Login or Register to embark on the journey!</div>
            </div>
        </CustomCard>
    )
}

export default Text