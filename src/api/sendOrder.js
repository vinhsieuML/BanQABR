import global from '../global'
const sendOrder = (token, arrayDetail, type) => {
    const data = { token, arrayDetail };
    let url;
    switch (type) {
        case 1:
            url = `${global.baseUrl}/api/cart`;
            break;
        case 2:
            url = `${global.baseUrl}/api/cartOnline`;
            break;
        case 3:
            url = `${global.baseUrl}/api/momo`;
            break;
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
