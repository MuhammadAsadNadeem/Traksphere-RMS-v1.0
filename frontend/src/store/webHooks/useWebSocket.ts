import { useEffect, useState } from "react";
import { BusLocation } from "../../types/location";


const useWebSocket = (url: string) => {
    const [location, setLocation] = useState<BusLocation | null>(null);

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            const data: BusLocation = JSON.parse(event.data);
            setLocation(data);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error", error);
        };

        return () => {
            socket.close();
        };
    }, [url]);

    return location;
};

export default useWebSocket;
