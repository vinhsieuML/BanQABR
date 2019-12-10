import global from '../global'
const signIn = (email, pass) => (
    fetch(`${global.baseUrl}/api/login`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, pass })
    })
    .then(res =>  res.json())
);

module.exports = signIn;
