import React, { Component } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
import global from '../../../../global'
import Header from '../../Shop/Header'
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
            topProducts: [],
            slider: [],
            refreshing: false
        }
    }

    fetchData() {
        fetch(global.baseUrl + '/api/types')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ types: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
        fetch(global.baseUrl + '/api/topProduct')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ topProducts: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
        fetch(global.baseUrl + '/api/slider')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ slider: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    onRefresh() {
        this.setState({ refreshing: true });
        this.fetchData();
        this.setState({ refreshing: false })

    }
    componentDidMount() {
        this.fetchData();
    }
    render() {
        const { types, topProducts, slider } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    navigation={this.props.navigation}
                />
                <ScrollView
                    style={{ flex: 1, backgroundColor: '#DBDBD8' }}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }
                >
                    <Collection navigation={this.props.navigation} slider={slider} types={types}/>
                    <Category navigation={this.props.navigation} types={types} />
                    <TopProduct navigation={this.props.navigation} topProducts={topProducts} />
                </ScrollView>
            </View>

        );
    }
}

export default HomeView;
