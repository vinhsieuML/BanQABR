import global from '../global'
const getOrderHistory = (token) => {
    return fetch(`${global.baseUrl}/api/orderHistory`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({token})
        })
        .then(res => res.json())
};

module.exports = getOrderHistory;
