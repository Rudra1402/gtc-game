import React, { useContext, useEffect, useState } from 'react'
import CustomCard from '../custom/CustomCard'
import CustomForm from '../custom/CustomForm'
import CustomInput from '../custom/CustomInput'
import CustomButton from '../custom/CustomButton'
import Text from './Text'
import { Link, useNavigate } from 'react-router-dom'
import Toast from '../custom/CustomToast'
import { handleUserRegistration } from '../../apis/apis'
import AppContext from '../../context/AppContext'
import classNames from 'classnames'

function Register() {
    const navigate = useNavigate();
    const { user, isDark } = useContext(AppContext);
    const [userObj, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    })
    const [confirmPass, setConfirmPass] = useState('');

    const handleChange = (e) => {
        let value = e.target.value;
        let temp = e.target.name;
        setUser({ ...userObj, [temp]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (confirmPass !== userObj.password) {
            Toast.error('Password does not match!')
            return;
        } else if (userObj.password.length < 6) {
            Toast.error('Password length must be at least 6 characters!')
            return;
        } else {
            handleUserRegistration(userObj, setUser, setConfirmPass);
        }
    }

    useEffect(() => {
        const userItem = JSON.parse(localStorage.getItem("user"));
        if (userItem) {
            navigate("/mode/user");
        }
    }, [user])

    return (
        <CustomCard
            className='h-[calc(100%-64px)] w-full flex py-4 md:py-6'
        >
            <Text />
            <div className='h-full w-full md:!w-1/2 lg:!w-7/12 py-2 px-4 md:px-8 flex flex-col gap-8 items-center justify-start overflow-y-auto'>
                <div className='text-3xl leading-none px-8'>Register</div>
                <CustomForm className='w-full px-4 md:px-2 gap-4 items-center' onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col items-center lg:flex-row gap-4 lg:gap-6'>
                        <CustomInput
                            name='firstName'
                            label='First Name'
                            labelClass='xs:!text-lg leading-none'
                            type='text'
                            size='small'
                            value={userObj.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            containerClass='!w-full xs:!w-fit'
                            extraClass='!w-full xs:!w-72'
                        />
                        <CustomInput
                            name='lastName'
                            label='Last Name'
                            labelClass='xs:!text-lg leading-none'
                            type='text'
                            size='small'
                            value={userObj.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            containerClass='!w-full xs:!w-fit'
                            extraClass='!w-full xs:!w-72'
                        />
                    </div>
                    <div className='w-full flex flex-col items-center lg:flex-row gap-4 lg:gap-6'>
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
                            extraClass='!w-full xs:!w-72'
                        />
                        <CustomInput
                            name='username'
                            label='Username'
                            labelClass='xs:!text-lg leading-none'
                            type='text'
                            size='small'
                            value={userObj.username}
                            onChange={handleChange}
                            placeholder="johndoe81"
                            containerClass='!w-full xs:!w-fit'
                            extraClass='!w-full xs:!w-72'
                        />
                    </div>
                    <div className='w-full flex flex-col items-center lg:flex-row gap-4 lg:gap-6'>
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
                            extraClass='!w-full xs:!w-72'
                        />
                        <CustomInput
                            name='confirmpassword'
                            label='Confirm Password'
                            labelClass='xs:!text-lg leading-none'
                            type='password'
                            size='small'
                            value={confirmPass}
                            onChange={e => setConfirmPass(e.target.value)}
                            placeholder="Confirm Password"
                            containerClass='!w-full xs:!w-fit'
                            extraClass='!w-full xs:!w-72'
                        />
                    </div>
                    <CustomButton
                        className='w-full !h-10 xs:!w-32 mt-2 md:mt-4 duration-150'
                        type='submit'
                        text='Register'
                    />
                </CustomForm>
                <hr className='border border-gray-400 w-2/3 md:w-1/2 m-0' />
                <div className='flex items-center gap-1 text-base xs:text-lg leading-none'>
                    Already have an account?
                    <Link to='/login' className={classNames(isDark ? 'text-green-400' : 'text-blue-600')}>Login</Link>
                </div>
            </div>
        </CustomCard>
    )
}

export default Register