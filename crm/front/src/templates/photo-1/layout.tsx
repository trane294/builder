import React, { useEffect } from 'react';

export type LayoutPhoto1Type = {
    children: React.ReactNode;
};

const LayoutPhoto1: React.FC<LayoutPhoto1Type> = ({ children }) => {
    // Add the useEffect hook to load the CSS dynamically
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/styles/tailwind-4.0.9.css';

        // Append the link to the <head>
        document.head.appendChild(link);

        // Cleanup: Remove the link when the component unmounts
        return () => {
            document.head.removeChild(link);
        };
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <div
            className="flex flex-col min-h-screen text-white"
            style={{
                backgroundColor: '#1E1E1E',
                fontFamily: '"PT Sans", serif',
            }}
        >
            {children}
        </div>
    );
};

export default LayoutPhoto1;
