import global from '../global'
const slider = (email, pass) => (
    fetch(`${global.baseUrl}/api/slider`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    .then(res => res.json())
);

module.exports = slider;