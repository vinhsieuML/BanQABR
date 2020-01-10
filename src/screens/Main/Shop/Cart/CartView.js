import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ActivityIndicator,
    Dimensions, StyleSheet, Image, FlatList, RefreshControl
} from 'react-native';
import { Popup } from 'popup-ui'
import { connect } from 'react-redux'
import * as actions from '../../../../actions';
import sendOrder from '../../../../api/sendOrder';
import getToken from '../../../../api/getToken';
import global from '../../../../global';
import saveCart from '../../../../api/saveCart';
import localSaveCart from '../../../../api/localSaveCart'

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class CartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isSending: false
        }
    }
    initCart = () => {
        this.props.initCart();
    }
    gotoDetail(product) {
        const { navigate } = this.props.navigation;
        navigate('ProductDetail', { product: product });
    }
    goToCheckOut(url) {
        const { navigate } = this.props.navigation;
        navigate('checkOut', { url: url });
    }
    async checkCart() {
        const token = await getToken();
        if (token !== '') {
            const result = await saveCart(token, this.props.cart.Cart);
            localSaveCart(result);
            this.props.initCart();
        }
    };
    async incrQuantity(product) {
        this.props.incrQuantity(product);
        this.checkCart();
    }
    async decrQuantity(product) {
        this.props.decrQuantity(product);
        this.checkCart();
    }
    async removeProduct(product) {
        this.props.removeProduct(product);
        this.checkCart();
    }
    onRefresh() {
        this.setState({ refreshing: true });
        this.checkCart();
        this.setState({ refreshing: false });

    }
    componentDidMount() {
        this.initCart();
    }
    async sendOrder(token, type) {
        this.setState({ isSending: true })
        const arrayDetail = this.props.cart.Cart.map(e => ({
            id: e.productInfo.product.id,
            idsize: e.productInfo.size,
            quantity: e.quantity
        }));
        await this.checkCart();
        const arrayDetailAfterCheck = this.props.cart.Cart.map(e => ({
            id: e.productInfo.product.id,
            idsize: e.productInfo.size,
            quantity: e.quantity
        }));
        // console.log('arrayDetail', arrayDetail);
        // console.log('arr', arrayDetailAfterCheck);
        // if (arrayDetail === arrayDetailAfterCheck) {
        // Popup.show({
        //     type: 'Success',
        //     title: 'Thành Công',
        //     button: true,
        //     textBody: 'Mua hàng thành công, sẽ có nhân viên xác nhận với bạn',
        //     buttonText: 'Xác Nhận',
        //     callback: () => {
        //             Popup.hide();
        //     }
        // })
        const kq = await sendOrder(token, arrayDetail, type);
        console.log(kq);
        if (kq === 'THANH CONG') {
            Popup.show({
                type: 'Success',
                title: 'Thành Công',
                button: true,
                textBody: 'Thanh Toán COD Thành Công, sẽ có nhân viên xác nhận với bạn',
                buttonText: 'Xác Nhận',
                callback: () => {
                    this.props.removeCart(),
                        this.setState({ isSending: false });
                    Popup.hide();
                }
            })

        } else {
            Popup.show({
                type: 'Warning',
                title: 'Chuyển sang trang thanh toán',
                button: false,
                textBody: 'Bạn sẽ được chuyển sang trang thanh toán',
                buttonText: 'Ok',
                callback: () => {
                    console.log(kq);
                    this.setState({ isSending: false }),
                        this.props.removeCart(),
                        this.goToCheckOut(kq),
                        Popup.hide();
                }
            })
        }
        // }
        // else {
        //     Popup.show({
        //         type: 'Danger',
        //         title: 'Một số sản phẩm đã thay đổi',
        //         button: false,
        //         textBody: 'Một số sản phẩm đã thay đổi vui lòng kiểm tra lại',
        //         buttonText: 'Ok',
        //         callback: () => {
        //             Popup.hide();
        //         }
        //     })
        // }
    }
    async onSendOrder(type) {
        if (this.state.isSending === true) return;
        try {
            console.log(type);
            const token = await getToken();
            if (token === "") {
                Popup.show({
                    type: 'Warning',
                    title: 'Bạn chưa Đăng Nhập',
                    button: false,
                    textBody: 'Vui lòng Đăng Nhập hoặc Đăng Kí',
                    buttonText: 'Đăng Nhập/Đăng Kí',
                    callback: () => {
                        Popup.hide();
                        this.props.navigation.navigate('Authentication')
                    },
                    cancelable: true,
                    cancelCallBack: () => {
                        Popup.hide();
                    }
                })
            }
            else {
                if (this.props.cart.user[0].address === null || this.props.cart.user[0].phone === null) {
                    Popup.show({
                        type: 'Warning',
                        title: 'Chưa có thông tin',
                        button: true,
                        textBody: 'Chưa có thông tin giao hàng vui lòng thay đổi trong Thay Đổi Thông Tin',
                        buttonText: 'Xác Nhận',
                        callback: () => {
                            Popup.hide();
                        }
                    })
                }
                else {
                    Popup.show({
                        type: 'Warning',
                        title: 'Xác nhận địa chỉ giao hàng',
                        button: true,
                        textBody: 'Địa Chỉ: ' + this.props.cart.user[0].address,
                        buttonText: 'Xác Nhận',
                        cancelable: true,
                        cancelCallBack: () => {
                            Popup.hide();
                        },
                        callback: () => {
                            Popup.hide();
                            setTimeout(() => {
                                this.sendOrder(token, type);
                            }, 1000)
                        }
                    })
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { main, totalPath, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer, listHeader, checkOutButton } = styles;
        const { Cart } = this.props.cart;
        const { isSending } = this.state;
        const arrTotal = Cart.map(e => e.productInfo.product.price * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        const indicator = (
            <View style={{ flexDirection: 'row' }}>
                <Text >Đang Thực Hiện Giao Dịch</Text>
                <ActivityIndicator size="small" color="#00ff00" animating={true} />
            </View>
        );
        const CartExist = this.state.isSending ? indicator : <Text >Các sản phẩm đã chọn</Text>
        return (
            <View style={wrapper}>
                <FlatList
                    contentContainerStyle={main}
                    enableEmptySections
                    data={Cart}
                    ListHeaderComponent={
                        <View style={listHeader}>{
                            Cart.length !== 0 ? CartExist
                                : <Text >Bạn chưa chọn sản phẩm nào</Text>}
                        </View>
                    }
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }
                    renderItem={cartItem => (
                        <View style={productStyle}>
                            <TouchableOpacity onPress={this.gotoDetail.bind(this, cartItem.item.productInfo.product)}>
                                <Image source={{ uri: `${global.baseUrl}/api/imageByID/${cartItem.item.productInfo.product.imagesID.split(',')[0]}` }} style={productImage} />
                            </TouchableOpacity>
                            <View style={[mainRight]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={txtName}>{toTitleCase(cartItem.item.productInfo.product.name)}</Text>
                                    <TouchableOpacity onPress={() => this.removeProduct(cartItem.item.productInfo)}>
                                        <Text style={{ fontFamily: 'Avenir', color: '#969696', fontSize: 15 }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={txtPrice}>{global.MoneyStand(cartItem.item.productInfo.product.price)} VNĐ</Text>
                                </View>
                                <View style={productController}>
                                    <View style={numberOfProduct}>
                                        <TouchableOpacity onPress={() => this.decrQuantity(cartItem.item.productInfo)}>
                                            <Text style={{ fontSize: 20 }}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 20 }}>{cartItem.item.quantity}</Text>
                                        <TouchableOpacity onPress={() => this.incrQuantity(cartItem.item.productInfo)}>
                                            <Text style={{ fontSize: 20 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={showDetailContainer} >
                                        <Text style={txtShowDetail}>Size: {cartItem.item.productInfo.sizename}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={cartItem => cartItem.productInfo.size}
                    extraData={this.state}
                />
                <View style={totalPath}>
                    <Text style={checkoutTitle}>TỔNG CỘNG: {global.MoneyStand(total)} VNĐ</Text>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1 }}>
                        <TouchableOpacity style={checkOutButton} onPress={this.onSendOrder.bind(this, 1)}>
                            <Text style={checkoutTitle}>COD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={checkOutButton} onPress={this.onSendOrder.bind(this, 2)}>
                            <Text style={checkoutTitle}>Thẻ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={checkOutButton} onPress={this.onSendOrder.bind(this, 3)}>
                            <Text style={checkoutTitle}>MoMo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    listHeader: {
        height: 30,
        marginTop: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    totalPath: {
        height: 70,
        backgroundColor: '#fff0e6',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkOutButton: {
        height: 40,
        width: 100,
        margin: 10,
        marginBottom: 20,
        marginTop: 0,
        backgroundColor: '#ffff66',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        margin: 5
    },
    productStyle: {
        flexDirection: 'row',
        marginBottom: 10,
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
        color: 'black',
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
        marginTop: 5,
        color: '#C21C70',
        fontSize: 15,
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
