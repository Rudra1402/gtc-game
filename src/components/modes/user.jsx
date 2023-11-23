import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchUserScore } from '../../apis/apis';
import AppContext from '../../context/AppContext';
import CustomCard from '../custom/CustomCard'
import Playarea from '../playarea/Playarea';
import Sidebar from '../sidebar/Sidebar';

function User() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const [score, setScore] = useState(0);
    const [scores, setScores] = useState(null);
    const [leaderboard, setLeaderboard] = useState(null);
    const [isScoreUpdated, setIsScoreUpdated] = useState(false);
    useEffect(() => {
        const userItem = JSON.parse(localStorage.getItem("user"));
        if (!userItem) {
            navigate("/login");
        }
        if (userItem || isScoreUpdated) {
            fetchUserScore(userItem?.id, setScores);
            setIsScoreUpdated(false);
        }
    }, [user, isScoreUpdated])
    return (
        <CustomCard className='w-full h-[calc(100%-64px)] flex md2:flex-row flex-col-reverse'>
            <Playarea
                id={user?.id}
                score={score}
                setScore={setScore}
                setIsScoreUpdated={setIsScoreUpdated}
                mode='user'
                leaderboard={leaderboard}
            />
            <Sidebar
                currScore={score}
                highestScore={scores?.highestScore}
                previousBest={scores?.currentScore}
                mode='user'
                leaderboard={leaderboard}
                setLeaderboard={setLeaderboard}
            />
        </CustomCard>
    )
}

export default User