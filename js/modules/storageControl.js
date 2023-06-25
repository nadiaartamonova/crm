
export const getStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};


export const setStorage = (key, value) => {
    const storageData = getStorage(key);
    if (storageData === null){
        storageData = [value];
    } else{
        const exists = storageData.some(item => item.id === value.id);
        if (!exists) {
            storageData.push(value);
        }
    }
    localStorage.setItem(key, JSON.stringify(storageData));
}

export const removeStorage = (id) => {
    let data = getStorage("basketList");
    data = data.filter(item => item.id !== id);
    localStorage.setItem("basketList", JSON.stringify(data));


}

