import AsyncStorage from '@react-native-community/async-storage';
import getToken from './getToken'
import global from '../global'
const saveCart = async (cartArray) => {
    try {
        var result;
        getToken()
            .then(token => {
                if (token !== '') {
                    const data = { token, cartArray };
                    fetch(`${global.baseUrl}/api/setCart`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(fetch(`${global.baseUrl}/api/setCart`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json'
                                },
                                body: JSON.stringify(data)
                            }).then(res => result = res)
                        )
                }
            })

        await AsyncStorage.setItem('@cart', res);

    }
    catch (e) {
        console.log(e);
    }

};

export default saveCart;
