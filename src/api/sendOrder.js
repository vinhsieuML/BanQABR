import global from '../global'
const sendOrder = (token, arrayDetail ,type) => {
    const data = { token, arrayDetail };
    let url;
    if (type === 1) {
        url = `${global.baseUrl}/api/cart`;
    } else {
        url = `${global.baseUrl}/api/cartOnline`;
    }
    return fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
};

module.exports = sendOrder;
