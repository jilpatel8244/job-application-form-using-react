import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function useLocalStorage(key) {
    const [localStorageValue, setLocalStorageValue] = useState(null);
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/add-application') {
            setLocalStorageValue([]);
        } else {
            let data = localStorage.getItem(key);

            if (data) {
                if (id) {
                    let filteredData = JSON.parse(data).filter((singleElement) => {
                        return singleElement.id === id
                    });

                    setLocalStorageValue(filteredData);
                }
                else {
                    setLocalStorageValue(JSON.parse(data));
                }
            }
        }
    }, [key])


    return [localStorageValue, setLocalStorageValue];
}

export default useLocalStorage;