import React, { Component } from 'react';
import {
    View, TouchableOpacity,
    Text, StyleSheet,
    Image, RefreshControl, ViewPropTypes, ScrollView, FlatList
} from 'react-native';
import { Icon } from 'react-native-elements'
import { thisTypeAnnotation } from '@babel/types';
import getListProduct from '../../../../api/getListProduct';
import global from '../../../../global'

// import backList from '../../../../media/appIcon/backList.png';

// const url = 'http://localhost/api/images/product/';
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            refreshing: false,
            page: 1
        };
        this.arr = [];
    }

    componentDidMount() {
        const { navigation } = this.props;
        var category = navigation.getParam('category');
        getListProduct(category.id, 1)
            .then(arrProduct => {
                this.arr = arrProduct;
                this.setState({ listProduct: arrProduct });
            })
            .catch(err => console.log(err));
    }

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    gotoDetail(item) {
        const { navigate } = this.props.navigation;
        navigate('productdetail', { product: item });
    }
    render() {
        const { container, header, wrapper, titleStyle,
            productContainer, productInfo, txtName, txtPrice,
            txtMaterial, lastRowInfo, txtColor, txtShowDetail, productImage
        } = styles;
        var category = this.props.navigation.getParam('category');
        return (
            <View style={container}>
                <View style={wrapper}>
                    <View style={header}>
                        <Icon
                            name='arrow-back'
                            onPress={this.goBack.bind(this)}
                        />
                        <Text style={titleStyle}>{category.name}</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.listProduct}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={this.gotoDetail.bind(this, item)}>
                                <View style={productContainer}>
                                    <Image
                                        style={productImage}
                                        source={{ uri: `${global.baseUrl}/api/imageByID/${item.imagesID.split(",")[0]}`}}
                                        indicator='bar' 
                                    />
                                    <View style={productInfo}>
                                        <Text style={txtName}>{toTitleCase(item.name)}</Text>
                                        <Text style={txtPrice}>{item.price} $</Text>
                                        <Text style={txtMaterial}>Material {item.material}</Text>
                                        <View style={lastRowInfo}>
                                            <Text style={txtColor} numberOfLines={1}>Color {item.color}</Text>
                                            <View style={{ backgroundColor: item.color.toLowerCase(), height: 16, width: 16, borderRadius: 8 }} />
                                            <TouchableOpacity onPress={this.gotoDetail.bind(this, item)}>
                                                <Text style={txtShowDetail}>SHOW DETAIL</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    // extraData ={selected}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBDBD8'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    wrapper: {
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 10,
        paddingHorizontal: 10
    },
    backStyle: {
        width: 30,
        height: 30
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
        fontSize: 20
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
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
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
