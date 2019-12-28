import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, Button, InteractionManager
} from 'react-native';
import global from '../../global'
import { Icon } from 'react-native-elements'

const url = global.baseUrl + '/api/imageByID/'

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class OrderDetail extends Component {
    state = { list: [] };
    gotoDetail(product) {
        const { navigate } = this.props.navigation;
        navigate('productdetail', { product: product });
    }
    getData(){
        fetch(`${global.baseUrl}/api/order_detail/${this.props.navigation.getParam('id')}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            })
            .then(res => res.json())
            .then(resJSON => this.setState({ list: resJSON }))
    }
    componentDidMount() {
        this.getData();
    }

    renderSwitch(param) {
        switch (param) {
            case 0:
                return <Text style={{ color: 'blue' }}>Chờ Duyệt COD</Text>;
            case 1:
                return <Text style={{ color: '#2ABB9C' }}>Đã Thanh Toán Online</Text>
            case 2:
                return <Text style={{ color: 'red' }}>Hủy Online</Text>
            case 3:
                return <Text style={{ color: 'blue' }}>Đang Giao Hàng</Text>
            case 4:
                return <Text style={{ color: 'green' }}>Hoàn Tất</Text>
            case 5:
                return <Text style={{ color: 'red' }}>Đã Hủy Bởi Bạn</Text>
        }
    }

    receiveOrder(){
        fetch(`${global.baseUrl}/api/updateOrder/${this.props.navigation.getParam('id')}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            })
            .then(res => this.getData())

    }
    payment(url){
        const { navigate } = this.props.navigation;
        navigate('pay', { url: url });
    }
    render() {
        const { container, header, wrapper, titleStyle,
            productContainer, productInfo, txtName, txtPrice,
            txtMaterial, lastRowInfo, txtColor, totalPath, productImage,checkoutTitle,checkOutButton
        } = styles;
        const { list } = this.state;
        return (
            <View style={container}>
                <View style={wrapper}>
                    <View style={header}>
                        <Text style={titleStyle}>Chi Tiết Đơn Hàng ORD{list.length === 0 ? 'XXX' : list[0].id}</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.list}
                        renderItem={({ item }) => (
                            // <TouchableOpacity onPress={this.gotoDetail.bind(this, item)}>
                            <View style={productContainer}>
                                <Image
                                    style={productImage}
                                    source={{ uri: `${url}${item.imagesID.split(",")[0]}` }}
                                    indicator='bar'
                                />
                                <View style={productInfo}>
                                    <Text style={txtName}>{toTitleCase(item.productName)}</Text>
                                    <Text style={txtPrice}>{global.MoneyStand(item.price / item.quantity)} VNĐ</Text>
                                    {/* <Text style={txtMaterial}>Material {item.material}</Text> */}
                                    <View style={lastRowInfo}>
                                        <Text style={txtColor} numberOfLines={1}>Size {item.sizeName}</Text>
                                        <Text style={txtColor} numberOfLines={1}>Số lượng {item.quantity}</Text>
                                        {/* <TouchableOpacity onPress={this.gotoDetail.bind(this, item)}>
                                                <Text style={txtShowDetail}>SHOW DETAIL</Text>
                                            </TouchableOpacity> */}
                                    </View>
                                </View>
                            </View>
                            // </TouchableOpacity>
                        )}
                        keyExtractor={item => item.productName}
                        extraData={this.state.listProduct}
                    />
                </View>
                {list.length !== 0 ?
                    <View style={totalPath}>
                        {list[0].orderCode !== null  ? <Text >Mã VC: <Text style={titleStyle}>{list[0].orderCode}</Text> | Ngày GH Dự Kiến: <Text style={titleStyle}>{list[0].expectedDeliveryTime.toString().split('T')[0]}</Text></Text> : null}
                        <View style={{flexDirection: 'row',justifyContent: "space-around" }}>
                        {list[0].orderCode !== '' ? <Text style={titleStyle,{marginTop: 10}}>Tình trạng: {this.renderSwitch(list[0].status)}</Text> : null}
                        {list[0].status === 3 ? <TouchableOpacity style={checkOutButton} onPress = {this.receiveOrder.bind(this)}><Text style={checkoutTitle} >Đã Nhận Hàng</Text></TouchableOpacity> : null}
                        {list[0].status === 2 ? <TouchableOpacity style={checkOutButton} onPress = {this.payment.bind(this, list[0].url_payment)}><Text style={checkoutTitle}>Thanh Toán Lại</Text></TouchableOpacity> : null}
                        </View>
                    </View>
                    : null}
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    totalPath: {
        height: 80,
        backgroundColor: '#fff0e6',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',

        bottom: 0,
    },
    wrapper: {
        backgroundColor: '#fff',
        flex: 9
        // shadowColor: '#2E272B',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.2,
        // margin: 10,
        // paddingHorizontal: 10
    },
    backStyle: {
        width: 30,
        height: 30
    },
    checkOutButton: {
        height: 40,
        width: 130,
        margin: 10,
        marginBottom: 14,
        marginTop: 0,
        backgroundColor: '#ffff66',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    titleStyle: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 15
    },
    productImage: {
        width: 90,
        height: (90 * 452) / 361
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1
    },
    checkoutTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        margin :5 
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtName: {
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 20,
        fontWeight: '400'
    },
    txtPrice: {
        fontFamily: 'Avenir',
        color: '#B10D65',
    },
    txtMaterial: {
        fontFamily: 'Avenir'
    },
    txtColor: {
        fontFamily: 'Avenir',
        width: 100,
    },
    txtShowDetail: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 11
    }
});

