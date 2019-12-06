import global from '../global'
const sendOrder = (token, arrayDetail) => {
    const data = { token, arrayDetail };
    return fetch(`${global.baseUrl}/api/cart`,
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
