import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import Child from './Child';
import * as actions from './actions'
import ButtonComp from './ButtonComp';
class Main extends Component {
    handleIncrease = () => {
        this.props.counterIncrease();
    };

    handleDecrease = () => {
        this.props.counterDecrease();
    };
    render() {
        return (
                <View style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center'
                }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Child />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ButtonComp
                            title="Increase"
                            textColor="#fff"
                            bgColor="#397af8"
                            onPress={this.handleIncrease.bind(this) } />
                        <ButtonComp
                            title="Decrease"
                            bgColor="orange"
                            onPress={this.handleDecrease.bind(this)} />
                    </View>
                </View>
        )
    }
}

export default connect(null,actions)(Main);

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'red'
    },
    btnStyle: {
        width: 100,
        height: 40,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "red",
        backgroundColor: "#15c"
    },
});