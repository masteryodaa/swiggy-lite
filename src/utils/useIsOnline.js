import { useState } from "react";

const useIsOnline = () => {

    const [isOnline, setIsOnline] = useState(true);

    const handleOnline = () => {
        setIsOnline(true);
    }

    const handleOffline = () => {
        setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return isOnline;
}

export default useIsOnline;