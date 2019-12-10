import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity, Image
} from 'react-native';
import global from '../../../../global'

const url = global.baseUrl + '/api/imageByID/'
export default class TopProduct extends Component {
    gotoDetail(product) {
        const { navigate } = this.props.navigation;
        navigate('productdetail',{product: product} );
    }
    render() {
        const {
            container, titleContainer, title,
            body, productContainer, productImage,
            produceName, producePrice
        } = styles;
        const { topProducts } = this.props;
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}>Sản Phẩm Bán Chạy</Text>
                </View>
                <View style={body}>
                    {topProducts.map(e => (
                        <TouchableOpacity style={productContainer} onPress={this.gotoDetail.bind(this,e)} key= {e.id}>
                            <Image source={{ uri: `${url}${e.imagesID.split(',')[0]}` }} style={productImage} />
                            <Text style={produceName}>{e.name}</Text>
                            <Text style={producePrice}>{global.MoneyStand(e.price)} VNĐ</Text>
                        </TouchableOpacity>
                    ))}
                    
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: 'black',
        fontSize: 20
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    productContainer: {
        width: produtWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: produtWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#D3D3CF',
        fontWeight: '500'
    },
    producePrice: {
        marginBottom: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#662F90'
    }
});


// https://github.com/vanpho93/LiveCodeReactNative

/*
    <View style={body}>
        {this.props.topProducts.map(e => (
                <TouchableOpacity style={productContainer} onPress={() => this.gotoDetail(e)} key={e.id}>
                <Image source={{ uri: `${url}${e.images[0]}` }} style={productImage} />
                <Text style={produceName}>{e.name.toUpperCase()}</Text>
                <Text style={producePrice}>{e.price}$</Text>
            </TouchableOpacity>
        ))}
    </View>
*/
