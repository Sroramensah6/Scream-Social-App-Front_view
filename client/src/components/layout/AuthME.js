import React, { useState, useEffect } from 'react';

import AuthenticatedNavDesktop from './AuthenticatedNavDesktop';
import AuthenticatedNavMobile from './AuthenticatedNavMobile';

function TitlebarGridList() {
    const BigOrSmall = useWindowWidth() >= 650 ? AuthenticatedNavDesktop : AuthenticatedNavMobile;
    return (
        <BigOrSmall />
    );
}

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    return windowWidth
}

export default TitlebarGridList