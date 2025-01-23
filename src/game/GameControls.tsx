import {useCallback} from "react";

interface GameControlsProps {
    speed?: number;
    onSpeedChange?: (speed: number) => void;
}

export const GameControls = ({speed, onSpeedChange}: GameControlsProps) => {

    const handleSpeedChange = useCallback((newSpeed: number) => {
        onSpeedChange?.(newSpeed); // Notify parent about speed change
    }, [onSpeedChange]);

    return <div className="flex space-x-2 justify-end pr-2">
        <button
            className={`px-4 py-2 rounded ${
                speed === 1 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleSpeedChange(1)}
        >
            1x
        </button>
        <button
            className={`px-4 py-2 rounded ${
                speed === 2 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleSpeedChange(2)}
        >
            2x
        </button>
        <button
            className={`px-4 py-2 rounded ${
                speed === 3 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleSpeedChange(3)}
        >
            3x
        </button>
    </div>
}
