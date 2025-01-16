import {useCallback} from "react";
import html2canvas from "html2canvas";

export const useScreenshot = () => {
    const takeScreenshot = useCallback(async (element: HTMLElement): Promise<string | null> => {
        if (element) {
            try {
                // Convert container to image
                const canvas = await html2canvas(element);
                return canvas.toDataURL("image/png");
            } catch (error) {
                console.error("Error generating screenshot:", error);
                return null;
            }
        } else {
            return null;
        }
    }, []);

    return {takeScreenshot};
}
