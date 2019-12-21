import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Modal, Button
} from 'react-native';
import { WebView } from 'react-native-webview'
import global from '../../../../global';
import { Icon } from 'react-native-elements'
import getSize from '../../../../api/getSize'
import { connect } from 'react-redux'
import * as actions from '../../../../actions'
import ImageViewer from 'react-native-image-zoom-viewer';
import SelectInput from 'react-native-select-input-ios'
import getToken from '../../../../api/getToken'
import saveCart from '../../../../api/saveCart'
import localSaveCart from '../../../../api/localSaveCart'
import { Toast } from 'popup-ui'

function IconWithBadge({ name, badgeCount, color, size, style }) {
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
            <Icon name={name} size={size} color={color} style={style} />
            {badgeCount > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}


class ProductDetail extends Component {
    constructor() {
        super();

    }
    state = { isZoom: false, listSize: null, selectedSize: null };
    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }
    async checkCart(){
        const token = await getToken();
        if (token !== '') {
            const result = await saveCart(token, this.props.cart.Cart);
            localSaveCart(result);
            this.props.initCart();
        }
    };
    async addThisProductToCart() {
        const product = this.props.navigation.getParam('product');
        const size = this.state.selectedSize;
        if (size !== null) {
            const sizename = this.state.listSize.find(e => e.id_size_detail === size).name;
            const data = { product, size , sizename};
            this.props.addProductToCart(data);
            this.checkCart();
            Toast.show({
                title: 'Thêm vào giỏ hàng',
                text: 'Đã Thêm Thành Công Vào Giỏ Hàng',
                color: '#f39c12',
                timing: 2000,
            });
        }
        else {
            Toast.show({
                title: 'Vui lòng chọn size',
                text: 'Bạn chưa chọn size vui lòng chọn size',
                color: 'red',
                timing: 2000,
            });
        }

    }
    imagePress() {
        this.setState({ isZoom: true });
    };
    backPress() {
        console.log(this.backHandler);
        this.setState({ isZoom: false });
        return true;
    }
    componentDidMount() {
        getSize(this.props.navigation.getParam('product').id)
            .then(res => {
                this.setState({ listSize: res })
            })
    }
    onSubmitEditingSize(value) {
        this.setState({
            selectedSize: value,
        });
    }
    render() {
        const {
            wrapper, cardStyle, header,
            footer, backStyle,
            imageContainer, cartStyle, textBlack,
            textSmoke, textHighlight, textMain, titleContainer,
            descContainer, productImageStyle, descStyle,
        } = styles;
        const { name, price, description, imagesID } = this.props.navigation.getParam('product');


        //Zoom Image
        var images = [];
        imagesID.split(",").map(e => (
            images.push({ url: `${global.baseUrl}/api/imageByID/${e}` })
        ))
        const imageZoom = (
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={images} onDoubleClick={this.backPress.bind(this)} onSwipeDown={this.backPress.bind(this)}/>
            </Modal>
        );
        //Cart
        const badgeValue = this.props.cart.Cart.map(e => e.quantity);
        const total = badgeValue.length ? badgeValue.reduce((a, b) => a + b) : 0;
        const info = (
            <ScrollView style={wrapper}>
                
                <View style={cardStyle}>
                    <View style={header}>
                        <Icon
                            name='arrow-back'
                            onPress={this.goBack.bind(this)}
                            style={backStyle}
                        />
                        <TouchableOpacity onPress={this.addThisProductToCart.bind(this)}>
                            <IconWithBadge
                                name="shopping-cart"
                                size={24}
                                type="ionicons"
                                color="black"
                                style={cartStyle}
                                badgeCount={total}
                            />

                        </TouchableOpacity>
                    </View>
                    <View style={imageContainer}>

                        <ScrollView style={{ flexDirection: 'row', padding: 10, height: swiperHeight }} horizontal showsHorizontalScrollIndicator={false}>
                            {imagesID.split(",").map(e => (
                                <TouchableOpacity onPress={this.imagePress.bind(this)} key={e}>
                                    <Image source={{ uri: `${global.baseUrl}/api/imageByID/${e}` }} style={productImageStyle} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <Text>Vui lòng chọn size</Text>
                    {this.state.listSize !== null ?
                        <SelectInput value={0} options={this.state.listSize} onSubmitEditing={this.onSubmitEditingSize.bind(this)} /> : null}

                    <View style={footer}>
                        <View style={titleContainer}>
                            <Text style={textMain}>
                                <Text style={textBlack}>{name.toUpperCase()}</Text>
                                <Text style={textHighlight}> {"\n"}</Text>
                                <Text style={textSmoke}>{global.MoneyStand(price)} VNĐ</Text>
                            </Text>
                        </View>
                        <View style={descContainer}>
                            <Text>
                            X không đơn thuần là một đôi giày. Đây là lời khẳng định rằng tốc độ sẽ chọc thủng hàng phòng ngự đối phương, thay vì đi vào ngõ cụt. Hãy dừng lại nếu bạn không thể nỗ lực bứt tốc. Nhưng hãy đọc tiếp nếu bạn đã sẵn sàng bứt phá mọi giới hạn. Mẫu giày bóng đá này có thân trên mỏng để đôi chân lướt nhẹ như không, cảm giác chạm bóng chân thực và tốc độ phi thường. Cổ giày thấp kết hợp hoàn hảo với gót đúc để giữ thăng bằng cho bạn trong các pha bóng bùng nổ.

Cảm giác chạm bóng chân thực
Thân giày trên bằng lưới Speedmesh siêu mỏng giúp đôi chân lướt nhẹ như không với tốc độ phi thường và cảm giác chạm bóng chân thực đến tuyệt vời

Ôm sát
Cổ giày thấp có thiết kế giống như chiếc móng vuốt cố định bàn chân trong giày để đem đến sự ổn định siêu việt; Hệ thống dây mui giày điều chỉnh linh hoạt kết hợp với lưỡi giày co giãn bốn chiều giúp cố định tối ưu; Gót giày đúc 3D nổi bật tạo độ ôm sát và các vùng có đệm lót giúp tối ưu cử động mắt cá chân

Lướt nhanh trên sân cỏ tự nhiên
Đế ngoài Speedframe siêu nhẹ đục lỗ để tập trung tăng tốc; Đinh giày hình mũi tên ở mũi giày kết hợp với đinh tròn ở gót giày giúp bạn nhanh chóng bứt tốc và dừng lại trên mặt sân cỏ tự nhiên
                            </Text>
                            {/* <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} /> */}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
        const mainJSX = this.state.isZoom ? imageZoom : info;

        return (

            <View style={wrapper}>
                {mainJSX}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.counter
});

export default connect(mapStateToProps, actions)(ProductDetail);
const { width,height } = Dimensions.get('window');
const swiperWidth = (width / 1.8) - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // backgroundColor: '#D6D6D6',
        backgroundColor: 'white',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // borderRadius: 5,
        // marginHorizontal: 10,
        // marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20
    },
    cartStyle: {
        width: 25,
        height: 25
    },
    backStyle: {
        width: 25,
        height: 25
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    footer: {
        flex: 6
    },
    imageContainer: {
        flex: 6,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    textMain: {
        paddingLeft: 20,
        marginVertical: 10
    },
    textBlack: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F3F46'
    },
    textSmoke: {
        fontFamily: 'Avenir',
        fontSize: 20,
        // color: '#9A9A9A'
        color: "red"
    },
    textHighlight: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#7D59C8'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5
    },
    descContainer: {
        margin: 10,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#AFAFAF'
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        marginHorizontal: 5
    },
    mainRight: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: 20
    },
    txtColor: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    }
});