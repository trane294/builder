import { useLocation, matchPath } from 'react-router';
import { useEffect, useState } from 'react';

interface useSubPathProps {
    basePath: string;
}

export const useSubPath = ({ basePath }: useSubPathProps) => {
    const location = useLocation();
    const [subPath, setSubPath] = useState<string>('/');

    useEffect(() => {
        const match = matchPath(
            { path: `${basePath}/:id/*` },
            location.pathname
        );

        if (match) {
            const extractedSubPath = match.params['*'] || '/';
            setSubPath(extractedSubPath);
        }
    }, [location.pathname, basePath]);

    return subPath;
};
