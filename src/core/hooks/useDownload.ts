import {useCallback} from "react";

export const useDownload = () => {
    const download = useCallback((dataUrl: string | null) => {
        if (dataUrl == null) {
            return;
        }
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "stareatyourwife.png";
        link.click();
    },[])

    return {download}
}
