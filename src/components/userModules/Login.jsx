import React, { useState, useEffect, useContext } from 'react'
import CustomButton from '../custom/CustomButton'
import CustomCard from '../custom/CustomCard'
import CustomForm from '../custom/CustomForm'
import CustomInput from '../custom/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import Text from './Text'
import { handleUserLogin } from '../../apis/apis'
import AppContext from '../../context/AppContext'
import classNames from 'classnames'

function Login() {
    const navigate = useNavigate();
    const { user, setUser, isDark } = useContext(AppContext);
    const [userObj, setUserObj] = useState({
        email: '',
        password: ''
    })
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        const temp = e.target.name;
        setUserObj({ ...userObj, [temp]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUserLogin(userObj, setIsLoginSuccess, setUser)
    }

    useEffect(() => {
        const userItem = JSON.parse(localStorage.getItem("user"));
        if (userItem) {
            navigate("/mode/user");
        }
    }, [user])

    useEffect(() => {
        if (isLoginSuccess) {
            setIsLoginSuccess(false);
            navigate("/mode/user");
        }
    }, [isLoginSuccess])

    return (
        <CustomCard
            className='h-[calc(100%-64px)] w-full flex py-4 md:py-6'
        >
            <Text />
            <div className='h-full w-full md:!w-1/2 lg:!w-7/12 py-2 px-4 md:px-8 flex flex-col gap-8 items-center justify-start md:justify-center overflow-y-auto'>
                <div className='text-3xl leading-none px-8'>Login</div>
                <CustomForm className='w-full items-center px-4 md:px-8 gap-4' onSubmit={handleSubmit}>
                    <CustomInput
                        name='email'
                        label='Email'
                        labelClass='xs:!text-lg leading-none'
                        type='email'
                        size='small'
                        value={userObj.email}
                        onChange={handleChange}
                        placeholder="johndoe@email.com"
                        containerClass='!w-full xs:!w-fit'
                        extraClass='!w-full xs:!w-80'
                    />
                    <CustomInput
                        name='password'
                        label='Password'
                        labelClass='xs:!text-lg leading-none'
                        type='password'
                        size='small'
                        value={userObj.password}
                        onChange={handleChange}
                        placeholder="Password"
                        containerClass='!w-full xs:!w-fit'
                        extraClass='!w-full xs:!w-80'
                    />
                    <CustomButton
                        className='w-full !h-10 xs:!w-32 mt-4 duration-150'
                        type='submit'
                        text='Login'
                    />
                </CustomForm>
                <hr className='border border-gray-400 w-2/3 md:w-1/3 m-0' />
                <div className='flex items-center gap-1 text-base xs:text-lg leading-none'>
                    Don't have an account?
                    <Link to='/register' className={classNames(isDark ? 'text-green-400' : 'text-blue-600')}>Register</Link>
                </div>
            </div>
        </CustomCard>
    )
}

export default Login