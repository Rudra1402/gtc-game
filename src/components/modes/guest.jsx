import React, { useState } from 'react'
import Playarea from '../playarea/Playarea'
import Sidebar from '../sidebar/Sidebar'

function Guest() {
    const [score, setScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState(null);
    return (
        <div className='w-full h-[calc(100%-64px)] flex md2:flex-row flex-col-reverse'>
            <Playarea
                score={score}
                setScore={setScore}
                mode='guest'
                leaderboard={leaderboard}
            />
            <Sidebar
                currScore={score}
                mode='guest'
                leaderboard={leaderboard}
                setLeaderboard={setLeaderboard}
            />
        </div>
    )
}

export default Guest