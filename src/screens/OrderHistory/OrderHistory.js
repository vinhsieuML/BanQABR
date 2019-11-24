import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView
} from 'react-native';
// import backSpecial from '../../media/appIcon/backs.png';
import getOrderHistory from '../../api/getOrderHistory';
import getToken from '../../api/getToken';

export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { arrOrder: [] };
    }

    componentDidMount() {
        getToken()
        .then(token => getOrderHistory(token))
        .then(arrOrder => this.setState({ arrOrder }))
        .catch(err => console.log(err));
    }

    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }
    render() {
        return (
            <View>
                <Text>
                    OrderHistort
                </Text>
            </View>
        );
    }
        
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6' },
    orderRow: {
        height: width / 3,
        backgroundColor: '#FFF',
        margin: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 10,
        borderRadius: 2,
        justifyContent: 'space-around'
    }
});