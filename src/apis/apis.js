import Toast from "../components/custom/CustomToast"
import api from '../axios/axios'

export const verifyToken = async (token) => {
    await api.get(`/verifyToken/${token}`)
        .then(response => {
            Toast.success(response.data?.message)
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
        })
}

export const handleUserRegistration = async (payload, setUser, setConfirmPass) => {
    await api.post('/register', payload)
        .then(response => {
            Toast.success(response.data?.message)
            setUser({
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                password: ''
            });
            setConfirmPass('');
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
        })
}

export const handleUserLogin = async (payload, setIsLoginSuccess, setUser) => {
    await api.post('/login', payload)
        .then(response => {
            if (response.data?.isVerified) {
                Toast.success(response.data?.message)
                localStorage.setItem("user", JSON.stringify(response.data?.user))
                setUser(response.data?.user)
                setIsLoginSuccess(true)
            } else {
                Toast.warn(response.data?.message)
            }
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
        })
}

export const fetchUserScore = async (userId, setScores) => {
    await api.get(`/userscore/${userId}`)
        .then(response => {
            setScores(response.data?.scores)
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
        })
}

export const updateUserScore = async (userId, score, setIsScoreUpdated) => {
    await api.put('/updateScore', { id: userId, score })
        .then(response => {
            Toast.success(response.data?.message)
            setIsScoreUpdated(true);
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
        })
}

export const getLeaderboard = async (setLeaderboard, setLoading) => {
    await api.get('/leaderboard')
        .then(response => {
            setLeaderboard(response.data?.leaderboard)
            setLoading(false)
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
        })
}