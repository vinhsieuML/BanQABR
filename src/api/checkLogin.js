import global from '../global'
const checkLogin = (token) => (
    fetch(`${global.baseUrl}/api/checkLogin`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
);

module.exports = checkLogin;
