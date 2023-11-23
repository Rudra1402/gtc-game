import React, { useEffect, useState } from 'react';
import './CustomSlider.css';
import classNames from 'classnames';

import play1 from '../../assets/play1.png'
import play2 from '../../assets/play2.png'

function CustomSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            return prevIndex + 1 === 2 ? 0 : prevIndex + 1;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 1500);
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <div className="relative w-full h-fit m-auto">
            <div className="flex gap-4 duration-500 ease-out">
                {[play1, play2].map((slide, index) => (
                    <div
                        key={index}
                        className={classNames(
                            index === currentIndex ? 'scale-150' : '',
                            'w-full h-auto'
                        )}
                    >
                        <img
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            className='w-full h-full object-cover border border-gray-200 rounded'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CustomSlider;
