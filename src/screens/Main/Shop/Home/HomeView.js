import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
import global from '../../../../global'
import Header from '../../Shop/Header'
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: []
        }
    }
    componentDidMount() {
        fetch(global.baseUrl + '/api/types')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ types: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        const { types, topProducts } = this.state;
        return (
            <View style= {{flex: 1}}>
                <Header
                    navigation={this.props.navigation}
                />
                <ScrollView style={{ flex: 1, backgroundColor: '#DBDBD8' }}>
                    <Collection navigation={this.props.navigation} />
                    <Category navigation={this.props.navigation} types={types} />
                    <TopProduct navigation={this.props.navigation} topProducts={topProducts} />
                </ScrollView>
            </View>

        );
    }
}

export default HomeView;
