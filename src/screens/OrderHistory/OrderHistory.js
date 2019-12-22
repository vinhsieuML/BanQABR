import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, RefreshControl
} from 'react-native';
import backSpecial from '../../media/appIcon/backs.png';
import getOrderHistory from '../../api/getOrderHistory';
import getToken from '../../api/getToken';
import global from '../../global'
export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOrder: [],
            refreshing: false
        };
    };

    getOrdered() {
        getToken()
            .then(token => {
                if (token !== '') {
                    getOrderHistory(token).then(arrOrder => this.setState({ arrOrder }));
                }
            })
            .catch(err => console.log(err));
    }
    componentDidMount() {
        this.getOrdered();
    }
    onRefresh() {
        this.setState({ refreshing: true });
        this.getOrdered();
        console.log(this.state.arrOrder);
        this.setState({ refreshing: false })

    }
    renderSwitch(param) {
        switch (param) {
            case 0:
                return 'Chờ Duyệt COD';
            case 1:
                return 'Đã Thanh Toán Online';
            case 2:
                return 'Đã Hủy Online';
            case 3:
                return 'Đã Duyệt, Đang Giao Hàng';
            case 4:
                return 'Đơn Hàng Hoàn Tất';
        }
    }
    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }
    render() {
        const { wrapper, header, headerTitle, backIconStyle, body, orderRow } = styles;

        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <Text style={headerTitle}>Lịch Sử Giao Dịch</Text>
                </View>
                <View style={body}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                        }
                    >
                        {this.state.arrOrder.map(e => (
                            <TouchableOpacity>
                                <View style={orderRow} key={e.id}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mã order:</Text>
                                        <Text style={{ color: '#2ABB9C' }}>ORD{e.id}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Thời gian:</Text>
                                        <Text style={{ color: '#C21C70' }}>{e.date_order}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Trạng Thái:</Text>
                                        <Text style={{ color: '#2ABB9C' }}>{this.renderSwitch(e.status)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tổng tiền:</Text>
                                        <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{global.MoneyStand(e.total)} VNĐ</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
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