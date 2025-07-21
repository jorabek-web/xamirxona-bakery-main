import { useState, useEffect } from "react";

export const Timer = ({ time }: { time: string }) => {
    const [currentTime, setCurrentTime] = useState("");

    const getTime = (time: string) => {
        const diffMs = new Date().getTime() - new Date(time).getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const hours = Math.floor(diffSec / 3600) % 60;
        const minutes = Math.floor((diffSec % 3600) / 60);
        const seconds = diffSec % 60;

        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes
            }:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    useEffect(() => {
        setCurrentTime(getTime(time));

        const interval = setInterval(() => {
            setCurrentTime(getTime(time));
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return <div>Timer: {currentTime}</div>;
};
