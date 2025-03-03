import React, { useEffect } from 'react';

const HeroPhoto1: React.FC = () => {
    return (
        <div
            id="hero"
            className="relative h-screen flex flex-col items-center justify-end bg-cover bg-center text-white p-[10%]"
            style={{
                backgroundImage:
                    "url('https://i.wfolio.ru/x/TwCkTSnjzeE6f_BUuBXFwXbgdJ2VF8Ay/3p1guTRDJGs5wbisvzVYmo6n4suYpHbI/qL1LWWIHa1aljhYtvOfJXAKQs_tCSgAk/RTJo29LSF2p9ap-Zh0_sgMG6pDgvctAw/8X3u4WNrmhRxgKIXCqO9pJcKUtA4tcfQ/NROugTDpLobYWauHSsKmPYaA_fYpfL-D/Lc7N8JMzUXolPeMfMH6tGXQrjl1uDOF3/gX12JlRCFbNEzlKkc0B2e6GVZl3hHVKk/lcp4h_CvVPfK7yIHuO1qg8P3LaH9aNaF/-07Kml42lcsWelcOuvP_lFSlm42xPq2f/DYZW5inT0dxmH8d0b64_Ms-E1SRvSbpj/cvumRz1z7qClmXSMFpsIAgY1xF6Dt2sh/-A-4ilxaRX4J8OeoJA5B3aZCo17eMNMZ/Qc_USPqgNmHjmO0_s17OCuxpI0br-DYN/q4w-NZbajObh03Edk7IxQyqDH8DCf3qE/WE6Po8D93qnx_jsJWhbJRxJdDlOjX0OU/SKUPHFuAkilZw2iIgNgTCc9hNsgnzHea/l0MU2Dnm9jGkPiKsZNxqnYlX__9oFZwv/VZLe8-ns0mKBasZ5qALvkS9r2WEu2JpT/LuCIjNtfHes.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative text-center">
                <h1 className="text-6xl mb-4">Prograin</h1>
                <p className="text-lg">
                    Максим Тонких |{' '}
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
