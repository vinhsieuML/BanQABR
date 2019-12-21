import AsyncStorage  from '@react-native-community/async-storage';

const localSaveCart = async (cart) => {
    try {
        await AsyncStorage.setItem('@cart', JSON.stringify(cart));
        return 'THANH_CONG';
    } catch (e) {
        console.log(e);
        return 'THAT_BAI';
    }
};

export default localSaveCart;