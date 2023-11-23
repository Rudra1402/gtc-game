import React, { useContext } from 'react'
import classNames from 'classnames'
import AppContext from '../../context/AppContext'

function CustomInput({
    id,
    name,
    type = "text",
    size = "medium",
    value,
    label,
    required = false,
    disabled = false,
    onChange,
    className,
    extraClass,
    labelClass,
    containerClass,
    ...props
}) {
    const { isDark } = useContext(AppContext);
    return (
        <div className={classNames('flex flex-col gap-1.5', containerClass)}>
            <label
                htmlFor={id}
                className={classNames(isDark ? 'text-gray-400' : 'text-gray-500', labelClass)}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={classNames(
                    'border border-gray-200 rounded p-2 text-base',
                    size == "xsmall"
                        ? 'w-48 h-10'
                        : size == "small"
                            ? 'w-56 h-10'
                            : size == "medium"
                                ? 'w-64 h-12'
                                : size == "large"
                                    ? 'w-72 h-12'
                                    : size == "xlarge"
                                        ? 'w-80 h-12'
                                        : className,
                    extraClass,
                    isDark ? 'bg-gray-100 text-gray-700' : 'text-gray-100 bg-[#123456]'
                )}
                {...props}
            />
        </div>
    )
}

export default CustomInput