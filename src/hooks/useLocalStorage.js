// import { useEffect, useState } from "react";

// function useLocalStorage(key, id = null) {
//     const [localStorageValue, setLocalStorageValue] = useState(null);

//     useEffect(() => {
//         let data = localStorage.getItem(key);

//         if (data) {
//             if (id) {
//                 let filteredData = JSON.parse(data).filter((singleElement) => {
//                     return singleElement.id === id
//                 });
//                 setLocalStorageValue(filteredData);
//             } else {
//                 setLocalStorageValue(JSON.parse(data));
//             }
//         }
//     }, [key])


//     return [localStorageValue, setLocalStorageValue];
// }

// export default useLocalStorage;

import { useState, useEffect } from 'react';

function useLocalStorage(key) {
    const [storedData, setStoredData] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    });

    // useEffect(() => {
    //     window.localStorage.setItem(key, JSON.stringify(storedData));
    // }, [key, storedData]);

    const getDataById = (id) => {
        return storedData.find((item) => item.id === id);
    };

    const initializeData = (data) => {
        console.log(data);
        let users = localStorage.getItem(key);

        if (users) {
            users = JSON.parse(localStorage.getItem(key));
        } else {
            users = [];
        }

        users.push(data);
        setStoredData(users);
        localStorage.setItem(key, JSON.stringify(users));
    }

    const removeDataById = (id) => {
        const updatedData = storedData.filter((item) => item.id !== id);
        setStoredData(updatedData);
    };

    const updateDataById = (id, newData) => {
        const updatedData = storedData.map((item) =>
            item.id === id ? { ...item, ...newData } : item
        );
        setStoredData(updatedData);
    };

    return {
        storedData,
        initializeData,
        getDataById,
        removeDataById,
        updateDataById,
    };
}

export default useLocalStorage;
