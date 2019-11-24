import global from '../global'
const getListProduct = (idType, page) => {
    let url;
    if (idType !== 'COLLECTION') {
        url = `${global.baseUrl}/api/productByType/${idType}/${page}`;
    } else {
        url = `${global.baseUrl}/api/get_collection.php?page=${page}`;
    }
    return fetch(url)
    .then(res => res.json())
    .then(resJson => {return resJson})
    .catch((err)=>{console.log(err)});
};

export default getListProduct;
