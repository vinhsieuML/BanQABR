import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Badge } from "react-native-elements";
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9,
    height: 18,
    minWidth: 0,
    width: 18
  },
  badgeContainer: {
    position: "absolute"
  },
  badgeText: {
    fontSize: 10,
    paddingHorizontal: 0
  }
});

// const withBadge = (value, options = {}) => WrappedComponent =>
//   class extends React.Component {

//     render() {
//       const { top = -5, right = -20, left = 0, bottom = 0, hidden = !value, ...badgeProps } = options;
//       const badgeValue = typeof value === "function" ? value(this.props) : value;
//       // const {Cart} = this.props.cart;
//       // const badgeValue = Cart.map(e => e.quantity);

//       return (
//         <View>
//           <WrappedComponent {...this.props} />
//           {!hidden && (
//             <Badge
//               badgeStyle={styles.badge}
//               textStyle={styles.badgeText}
//               value={badgeValue}
//               status="error"
//               containerStyle={[styles.badgeContainer, { top, right, left, bottom }]}
//               {...badgeProps}
//             />
//           )}
//         </View>
//       );
//     }
//   };


class withBadge extends Component {
  render() {
    const { top = -5, right = -20, left = 0, bottom = 0, hidden = !value, ...badgeProps } = options;
    // const badgeValue = typeof value === "function" ? value(this.props) : value;
    const { Cart } = this.props.cart;
    const badgeValue = Cart.map(e => e.quantity);

    return (
      <View>
        {console.log(badgeValue)}
        <WrappedComponent {...this.props} />
        {!hidden && (
          <Badge
            badgeStyle={styles.badge}
            textStyle={styles.badgeText}
            value={badgeValue}
            status="error"
            containerStyle={[styles.badgeContainer, { top, right, left, bottom }]}
            {...badgeProps}
          />
        )}
      </View>
    );
  }
};

const mapStateToProps = state =>({
  cart: state.counter
});

export default connect(mapStateToProps, null)(withBadge);
// export default withBadge;