import global from '../global'
const saveCart = async (token, cartArray) => {
    const res = await fetch(`${global.baseUrl}/api/setCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, cartArray })
    });
    return await res.json();
};

export default saveCart;
