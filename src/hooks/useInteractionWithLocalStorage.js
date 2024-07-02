import { useState } from "react";

function useInteractionWithLocalStorage(key) {
    let [data, setData] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    });

    function getItem() {
        const result = JSON.parse(localStorage.getItem(key)) || [];
        setData(result);
        return result;
    }

    function setItem(value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function removeItem(key) {
        return localStorage.removeItem(key);
    }

    return { data, setData, getItem, setItem, removeItem }
}

export default useInteractionWithLocalStorage;