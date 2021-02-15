export const sendPost = (url, data, errorStatus=undefined) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            if (!error.response) {
                errorStatus = 'Network Error';
            } else {
                errorStatus = error.response.data.message;
            }
            return {error: errorStatus};
        });
};
