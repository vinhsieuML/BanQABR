import global from '../global'
const register = (email, name, password) => (
    fetch(`${global.baseUrl}/api/register`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, name, password })
    })
    .then(res => res.text())
);

module.exports = register;
