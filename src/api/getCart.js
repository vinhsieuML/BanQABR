import  AsyncStorage  from '@react-native-community/async-storage';

const getCart = async () => {
    try {
        const value = await AsyncStorage.getItem('@cart');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
    // Error retrieving data
        return [];
    }
};

export default getCart;
