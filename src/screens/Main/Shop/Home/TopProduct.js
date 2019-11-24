import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, Dimensions, TouchableOpacity, ListView 
} from 'react-native';

import {Image, Icon} from 'react-native-elements'

const littleIcon = require('../../../../media/temp/little.jpg');
const url = 'http://localhost/api/images/product/';

export default class TopProduct extends Component {
    gotoDetail(product) {
        const { navigate } = this.props.navigation;
        navigate('ProductDetail');
    }
    render(){
        const { 
            container, titleContainer, title, 
            body, productContainer, productImage,
            produceName, producePrice 
        } = styles;
        const { topProducts } = this.props;
        return(
            <View style={container}>
                <View style={titleContainer}>
                    <Text style= {title}>TOP PRODUCT</Text>
                </View>
                <View style={body}>
                    <TouchableOpacity style={productContainer} onPress={this.gotoDetail.bind(this)}>
                        <Image source={{uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t31.0-1/c0.118.960.960a/p960x960/28164566_955091434655498_2472974777705394288_o.jpg?_nc_cat=101&_nc_oc=AQm8z4GaGFlIYC_x8CMWpgEjcS4uSa7NFzKXzhaVscylaWTYgEGwvGSxCmlTsjKKDPw&_nc_ht=scontent.fsgn4-1.fna&oh=bba638b94abd6039f58f191213b78f0d&oe=5E3FA246'}} style={productImage}/>
                        <Text style={produceName}>PRODUCT NAME</Text>
                        <Text style={producePrice}>400$</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={productContainer} onPress={this.gotoDetail.bind(this)}>
                        <Image source={{uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t31.0-1/c0.118.960.960a/p960x960/28164566_955091434655498_2472974777705394288_o.jpg?_nc_cat=101&_nc_oc=AQm8z4GaGFlIYC_x8CMWpgEjcS4uSa7NFzKXzhaVscylaWTYgEGwvGSxCmlTsjKKDPw&_nc_ht=scontent.fsgn4-1.fna&oh=bba638b94abd6039f58f191213b78f0d&oe=5E3FA246'}} style={productImage}/>
                        <Text style={produceName}>PRODUCT NAME</Text>
                        <Text style={producePrice}>400$</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={productContainer} onPress={this.gotoDetail.bind(this)}>
                        <Image source={{uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t31.0-1/c0.118.960.960a/p960x960/28164566_955091434655498_2472974777705394288_o.jpg?_nc_cat=101&_nc_oc=AQm8z4GaGFlIYC_x8CMWpgEjcS4uSa7NFzKXzhaVscylaWTYgEGwvGSxCmlTsjKKDPw&_nc_ht=scontent.fsgn4-1.fna&oh=bba638b94abd6039f58f191213b78f0d&oe=5E3FA246'}} style={productImage}/>
                        <Text style={produceName}>PRODUCT NAME</Text>
                        <Text style={producePrice}>400$</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={productContainer} onPress={this.gotoDetail.bind(this)}>
                        <Image source={{uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t31.0-1/c0.118.960.960a/p960x960/28164566_955091434655498_2472974777705394288_o.jpg?_nc_cat=101&_nc_oc=AQm8z4GaGFlIYC_x8CMWpgEjcS4uSa7NFzKXzhaVscylaWTYgEGwvGSxCmlTsjKKDPw&_nc_ht=scontent.fsgn4-1.fna&oh=bba638b94abd6039f58f191213b78f0d&oe=5E3FA246'}} style={productImage}/>
                        <Text style={produceName}>PRODUCT NAME</Text>
                        <Text style={producePrice}>800$</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    // render() {
    //     const { 
    //         container, titleContainer, title, 
    //         body, productContainer, productImage,
    //         produceName, producePrice 
    //     } = styles;
    //     const { topProducts } = this.props;
    //     return (
    //         <View style={container}>
    //             <View style={titleContainer}>
    //                 <Text style={title}>TOP PRODUCT</Text>
    //             </View>
                
    //             <ListView 
    //                 contentContainerStyle={body}
    //                 enableEmptySections
    //                 dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(topProducts)}
    //                 renderRow={product => (
    //                     <TouchableOpacity style={productContainer} onPress={() => this.gotoDetail(product)}>
    //                         <Image source={{ uri: `${url}${product.images[0]}` }} style={productImage} />
    //                         <Text style={produceName}>{product.name.toUpperCase()}</Text>
    //                         <Text style={producePrice}>{product.price}$</Text>
    //                     </TouchableOpacity>
    //                 )}
    //                 renderSeparator={(sectionId, rowId) => {
    //                     if (rowId % 2 === 1) return <View style={{ width, height: 10 }} />;
    //                     return null;
    //                 }}
    //             />
    //         </View>
    //     );
    // }
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
        color: '#D3D3CF',
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
