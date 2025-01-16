import {useCallback} from "react";

export const useCopy = (): { copy: (msg: string) => void } => {
    const copy = useCallback((msg: string) => {
        navigator.clipboard.writeText(msg)
    }, []);

    return {copy};
}

export const useCopyHashtag = () => {
    const {copy} = useCopy();
    const copyHashtag = useCallback(() => {
        copy("#stareatyourwife");
    }, [copy]);

    return {copyHashtag};
}
