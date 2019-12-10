import global from '../global'
const getSize = (ProductId) => {
    let url;
    url = `${global.baseUrl}/api/size/${ProductId}`;

    return fetch(url)
        .then(res => res.json())
        .then(resJson => { return resJson })
        .catch((err) => { console.log(err) });
};

export default getSize;
