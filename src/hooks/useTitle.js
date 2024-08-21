import { useEffect } from "react";

export const useTitle = (title) => {

    useEffect(() => {
        document.title = `${title} - TechBook`;
    }, [title]);

  return null;
}