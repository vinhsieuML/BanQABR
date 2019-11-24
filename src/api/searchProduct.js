import global from '../global'
const searchProduct = (key) => {
    const url = `${global.baseUrl}/api/search/${key}`;
    return fetch(url)
    .then(res => res.json());
};

export default searchProduct;
