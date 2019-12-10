import global from '../global'
const changeInfo = (token, userInfo) => {
    const data = { token, userInfo };
    return fetch(`${global.baseUrl}/api/changeInfo`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
};

module.exports = changeInfo;
