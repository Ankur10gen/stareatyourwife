import {useSocket} from "stare/game/socket/SocketProvider";
import '../../home/banner/image-banner/ImageBanner.css'
import React from "react";

type ErrorMsgProps = {
    onClose: () => void
}

export const ErrorMsg = ({onClose}: ErrorMsgProps) => {
    const {game} = useSocket();
    const {error} = game;

    if (error) {
        return (

            <div className="dialog-overlay flex-col">
                <div className={'flex justify-end w-full mr-6'} onClick={onClose}>
                    <div className={'w-6 h-6'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor"
                             className={'text-white'}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                </div>
                <div className="dialog-box">
                    <h3>{error}</h3>
                </div>
            </div>
        )
    }
}
