export const getItemsByUrl = (url) => {
    return  fetch(url).then(response => response.json());
};
