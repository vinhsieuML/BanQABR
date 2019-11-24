import React, { Component } from 'react';
import {
    StyleSheet, Text, TouchableOpacity,
    FlatList, View, Image, Dimensions
} from 'react-native';
// import global from '../../../global';
import Header from '../../Shop/Header';
import {connect} from 'react-redux'
import global from '../../../../global'
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class SearchView extends Component {
    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        // this.state = {
        //     listProduct: ds
        // };
        // global.setArraySearch = this.setSearchArray.bind(this);
    }

    setSearchArray(arrProduct) {
        this.setState({ listProduct: this.state.listProduct.cloneWithRows(arrProduct) });
    }

    gotoDetail(product) {
        const { navigate } = this.props.navigation;
        navigate('ProductDetailForSearch', {product: product});
    }
    render() {
        const {
            product, mainRight, txtMaterial, txtColor,
            txtName, txtPrice, productImage,
            txtShowDetail, showDetailContainer, wrapper
        } = styles;
        
        const { arrProduct } = this.props.cart;
        return (
            <View style={wrapper}>
                <Header navigation={this.props.navigation}/>
                <FlatList
                    data={arrProduct}
                    renderItem={productItem => (
                        <View style={product}>
                            <Image source={{  uri: `${global.baseUrl}/api/imageByID/${productItem.item.imagesID.split(',')[0]}` }} style={productImage} />
                            <View style={mainRight}>
                                <Text style={txtName}>{toTitleCase(productItem.item.name)}</Text>
                                <Text style={txtPrice}>{productItem.item.price}$</Text>
                                <Text style={txtMaterial}>Material {productItem.item.material}</Text>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={txtColor}>Color {productItem.item.color}</Text>
                                    <View
                                        style={{
                                            height: 15,
                                            width: 15,
                                            backgroundColor: 'white',
                                            borderRadius: 15,
                                            marginLeft: 10
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoDetail(productItem.item)}>
                                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    extraData ={arrProduct}
                />
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
        backgroundColor: '#DFDFDF',
        flex: 1
    },
    product: {
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
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtColor: {
        paddingLeft: 20,
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtMaterial: {
        paddingLeft: 20,
        color: 'black',
        fontSize: 15,
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
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 100
    }
});

export default connect(mapStateToProps, null)(SearchView);
