import React from 'react'
import classNames from 'classnames'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

function CustomButton({
    type,
    text,
    onClick,
    size = "small",
    sizeClass,
    className,
    ...props
}) {
    const { isDark } = useContext(AppContext);
    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(
                'rounded-md',
                'flex items-center justify-center',
                size == "small"
                    ? 'w-32 h-8'
                    : size == "medium"
                        ? 'w-48 h-10'
                        : size == "large"
                            ? 'w-64 h-12'
                            : sizeClass,
                className,
                isDark ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-[#123456] hover:bg-[#123456cc] text-gray-100'
            )}
            {...props}
        >
            {text}
        </button>
    )
}

export default CustomButton