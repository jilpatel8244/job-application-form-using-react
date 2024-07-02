import useInteractionWithLocalStorage from './useInteractionWithLocalStorage';

function useLocalStorage(key) {
    let { data, setData, setItem } = useInteractionWithLocalStorage(key);

    const getDataById = (id) => {
        return data.find((item) => item.id === id);
    };

    const addData = (newData) => {
        const updatedData = [...data, newData];
        setData(updatedData);
        setItem(updatedData);
    };

    const removeDataById = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        setItem(updatedData);
    };

    const updateDataById = (id, newData) => {
        const updatedData = data.map((item) =>
            item.id === id ? { ...item, ...newData } : item
        );
        setData(updatedData);
        setItem(updatedData);
    };

    return {
        data,
        addData,
        getDataById,
        removeDataById,
        updateDataById,
    };
}


export default useLocalStorage;
