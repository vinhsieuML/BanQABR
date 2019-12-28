import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import global from '../../../../global'
import SwiperFlatList from 'react-native-swiper-flatlist';

const { width } = Dimensions.get('window');
const url = global.baseUrl + '/api/slider/'
export default class Category extends Component {
    gotoListProduct() {
        const { navigate } = this.props.navigation;
        navigate("listproduct",  {category: this.props.types[0]});
    }
    render() {
        const { wrapper, textStyle, imageStyle,cateTitle } = styles;
        const { slider } = this.props;
        return (
            <View style={wrapper}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={textStyle} >Thông Tin Mới</Text>
                </View>
                <SwiperFlatList
                    // autoplay
                    // autoplayDelay={2}
                    // autoplayLoop
                    // index={1}
                    // Xử lí bất đồng bộ khi chưa load hình xong
                >
                    
                    {slider.map(e => (
                        <TouchableOpacity onPress={() => this.gotoListProduct(e)} key ={e.id}>
                            <Image source={{uri:`${url}${e.id}` }} style={imageStyle} >
                                <Text style ={cateTitle}>
                                {e.name}
                                </Text>
                            </Image>
                         </TouchableOpacity>
                    ))}
                </SwiperFlatList>
            </View>
        );
    }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        backgroundColor: '#FFF',
        margin: 10,
        justifyContent: 'space-between',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: 'black'
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cateTitle: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#9A9A9A'
    }
});
