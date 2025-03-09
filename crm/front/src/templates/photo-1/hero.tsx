import React, { useEffect } from 'react';
import { Components } from './config';

export type IHeroPhoto1 = {
    title: string;
    name: string;
    imageUrl?: {
        field: object;
        value: string;
    };
};

const HeroPhoto1: React.FC<IHeroPhoto1> = ({ title, name, imageUrl }) => {
    return (
        <div
            id="hero"
            className="relative h-screen flex flex-col items-center justify-end bg-cover bg-center text-white p-[10%]"
            style={{
                backgroundImage: `url('${imageUrl && imageUrl.value}')`,
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative text-center">
                <h1 className="text-6xl mb-4">{title}</h1>
                <p className="text-lg">
                    {name} |{' '}
                    <a href="https://mxtkh.ru" className="underline">
                        mxtkh.ru
                    </a>
                </p>
            </div>

            <div className="absolute bottom-4 animate-bounce">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    );
};

export default HeroPhoto1;
