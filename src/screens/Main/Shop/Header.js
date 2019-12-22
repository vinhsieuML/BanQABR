import React, { Component } from 'react';
import {
    View, TouchableOpacity, Image, Dimensions, TextInput, StyleSheet, TouchableWithoutFeedbackBase
} from 'react-native';
import search from '../../../api/searchProduct'
import { Icon, Text, Button } from 'react-native-elements';
import * as actions from '../../../actions'
import { connect } from 'react-redux'


const { height } = Dimensions.get('window');


class Header extends Component {
    static headerInstance;
    constructor(props) {
        super(props);
        this.headerInstance = this;
        this.state = {
            txtSearch: ''
        };
    }

    static getInstance() {
        if (this.headerInstance === null) {
            this.headerInstance = new Header();
            return this.headerInstance;
        }
        else {
            return this.headerInstance;
        }
    }

    static refresh() {
        console.log(this.headerInstance);
        // this.headerInstance.onSearch();
        // this.onSearch;
    }
    state = {
        txtSearch: ''
    };
    gotoSearch() {
        const { navigate } = this.props.navigation;
        navigate('Search');
    }
    onSearch() {
        const { txtSearch } = this.state;
        this.setState({ txtSearch: '' });
        search(txtSearch)
            .then(arrProduct => {
                this.props.setArrayProduct(arrProduct);
            }

            )
            .catch(err => console.log(err));
    }


    openDrawer() {
        this.props.drawer.drawer.toggleDrawer();
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.row1}>
                    <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                        <Icon
                            name="menu"
                            color="white"
                        />
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}>SH Basketballs</Text>
                    {/* <Icon 
                     name = "shopping-cart"
                     color = "white"
                    /> */}
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Hôm nay bạn muốn mua gì ?"
                    underlineColorAndroid="transparent"
                    value={this.state.txtSearch}
                    onChangeText={text => this.setState({ txtSearch: text })}
                    onFocus={this.gotoSearch.bind(this)}

                    onSubmitEditing={this.onSearch.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: height / 8,
        backgroundColor: 'black',
        padding: 10,
        justifyContent: 'space-around'
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between' },
    textInput: {
        height: height / 23,
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingVertical: 0
    },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 20 },
    iconStyle: { width: 25, height: 25 }
});
const mapStateToProps = state => ({
    drawer: state.counter
});
export default connect(mapStateToProps, actions)(Header);
