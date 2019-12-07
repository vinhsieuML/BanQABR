import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Modal
} from 'react-native';
import global from '../../../../global';
import { Icon, ThemeConsumer } from 'react-native-elements'
import { connect } from 'react-redux'
import * as actions from '../../../../actions'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Root, Toast } from 'popup-ui'

function IconWithBadge({ name, badgeCount, color, size, style }) {
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
            <Icon name={name} size={size} color={color} style={style} />
            {badgeCount > 0 && (
                <View
                    style={{
                        // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
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
    state = { isZoom: false };
    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }
    addThisProductToCart() {
        const product = this.props.navigation.getParam('product');
        this.props.addProductToCart(product);
        Toast.show({
            title: 'Đã thêm vào giỏ hàng',
                text: 'Đã Thêm Thành Công Vào Giỏ Hàng',
                color: '#f39c12',
                timing: 2000,
        });
    }
    imagePress() {
        this.setState({ isZoom: true });
    };
    backPress() {
        console.log(this.backHandler);
        this.setState({ isZoom: false });
        return true;
    }
    render() {
        const {
            wrapper, cardStyle, header,
            footer, backStyle,
            imageContainer, cartStyle, textBlack,
            textSmoke, textHighlight, textMain, titleContainer,
            descContainer, productImageStyle, descStyle, txtMaterial, txtColor
        } = styles;
        const { name, price, color, material, description, imagesID } = this.props.navigation.getParam('product');

        //Zoom Image
        var images = [];
        imagesID.split(",").map(e => (
            images.push({ url: `${global.baseUrl}/api/imageByID/${e}` })
        ))
        const imageZoom = (
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={images} onDoubleClick={this.backPress.bind(this)} onSwipeDown={this.backPress.bind(this)} />
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
                        <View style={footer}>
                            <View style={titleContainer}>
                                <Text style={textMain}>
                                    <Text style={textBlack}>{name.toUpperCase()}</Text>
                                    <Text style={textHighlight}> / </Text>
                                    <Text style={textSmoke}>{price}$</Text>
                                </Text>
                            </View>
                            <View style={descContainer}>
                                <Text style={descStyle}>{description}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                                    <Text style={txtMaterial}>Material {material}</Text>
                                    <View style={{ flexDirection: 'row' }} >
                                        <Text style={txtColor}>Color {color}</Text>
                                        <View style={{ height: 15, width: 15, backgroundColor: color.toLowerCase(), borderRadius: 15, marginLeft: 10, borderWidth: 1, borderColor: '#C21C70' }} />
                                    </View>
                                </View>
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
const { width } = Dimensions.get('window');
const swiperWidth = (width / 1.8) - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10
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
        color: '#9A9A9A'
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
