import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ListView,
    Dimensions, StyleSheet, Image, Button, FlatList
} from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../../../actions';
import sendOrder from '../../../../api/sendOrder';
import getToken from '../../../../api/getToken';
import global from '../../../../global';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class CartView extends Component {
    constructor(props) {
        super(props);
    }
    initCart = () => {
        this.props.initCart();
    }
    gotoDetail(product) {
        console.log('this is');
        const { navigate } = this.props.navigation;
        navigate('ProductDetail', { product: product });
    }
    incrQuantity(product) {
        this.props.incrQuantity(product);
    }
    decrQuantity(product){
        this.props.decrQuantity(product);
    }
    removeProduct(product){
        this.props.removeProduct(product);
    }
    componentDidMount() {
        this.initCart();
    }
    async onSendOrder() {
        try {
            const token = await getToken();
            const arrayDetail = this.props.cart.Cart.map(e => ({
                id: e.product.id,
                quantity: e.quantity
            }));
            const kq = await sendOrder(token, arrayDetail);
            if (kq === 'THEM_THANH_CONG') {
                console.log('THEM THANH CONG');
            } else {
                console.log('THEM THAT BAI', kq);
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        const { Cart } = this.props.cart;
        const arrTotal = Cart.map(e => e.product.price * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={wrapper}>
                <FlatList
                    contentContainerStyle={main}
                    enableEmptySections
                    data={Cart}
                    renderItem={cartItem => (
                        <View style={productStyle}>
                            <Image source={{ uri: `${global.baseUrl}/api/imageByID/${cartItem.item.product.imagesID.split(',')[0]}` }} style={productImage} />
                            <View style={[mainRight]}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={txtName}>{toTitleCase(cartItem.item.product.name)}</Text>
                                    <TouchableOpacity onPress={() => this.removeProduct(cartItem.item.product)}>
                                        <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={txtPrice}>{cartItem.item.product.price}$</Text>
                                </View>
                                <View style={productController}>
                                    <View style={numberOfProduct}>
                                        <TouchableOpacity onPress={() => this.incrQuantity(cartItem.item.product)}>
                                            <Text style={{fontSize: 20}}>+</Text>
                                        </TouchableOpacity>
                                        <Text style={{fontSize: 20}}>{cartItem.item.quantity}</Text>
                                        <TouchableOpacity onPress={() => this.decrQuantity(cartItem.item.product)}>
                                            <Text style={{fontSize: 20}}>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={showDetailContainer} onPress={this.gotoDetail.bind(this,cartItem.item.product)}>
                                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor = {cartItem => cartItem.product.id}
                    extraData={this.state}
                />
                <TouchableOpacity style={checkoutButton} onPress={this.onSendOrder.bind(this)}>
                    <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    cart: state.counter
});
const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    productStyle: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});
// export default CartView;
export default connect(mapStateToProps, actions)(CartView);
