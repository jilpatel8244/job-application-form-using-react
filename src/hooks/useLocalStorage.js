import { useState, useEffect } from 'react';

function useLocalStorage(key) {
    const [storedData, setStoredData] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedData))
    }, [key, storedData]);

    const getDataById = (id) => {
        return storedData.find((item) => item.id === id);
    };

    const addData = (newData) => {
        const updatedData = [...storedData, newData];
        setStoredData(updatedData);
        localStorage.setItem(key, JSON.stringify(updatedData))
    };

    const removeDataById = (id) => {
        const updatedData = storedData.filter((item) => item.id !== id);
        setStoredData(updatedData);
        localStorage.setItem(key, JSON.stringify(updatedData))
    };

    const updateDataById = (id, newData) => {
        const updatedData = storedData.map((item) =>
            item.id === id ? { ...item, ...newData } : item
        );
        console.log(updatedData);
        setStoredData(updatedData);
        localStorage.setItem(key, JSON.stringify(updatedData))
    };

    return {
        storedData,
        addData,
        getDataById,
        removeDataById,
        updateDataById,
    };
}

export default useLocalStorage;
