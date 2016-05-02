import React from 'react';
import BurgerMenu from 'react-burger-menu';
import { closeMenu, openMenu } from '/imports/client/actions/openMenu';
import { connect } from 'react-apollo';
import CartList from '/imports/client/components/CartList';

class CartMenu extends React.Component {
  render() {
    const Menu = BurgerMenu['slide'];
    const { dispatch, isOpen } = this.props;
    const showNav = !isOpen ? (
      <div id="cd-cart-trigger">
        <a className="cd-img-replace" onClick={function (e) {
        e.preventDefault();
        return dispatch(openMenu());
      }}>Cart</a></div>
    ) : "";
    const isMenuOpen = function (state) {
      if (!state.isOpen) {
        dispatch(closeMenu());
      }
    };
    const showList = isOpen ? (
      <div>
        <h2>Cart <a style={{float: "right", cursor: "pointer"}} onClick={function (e) {
            e.preventDefault();
            return dispatch(closeMenu());
          }}>Close</a>
        </h2>
        <CartList />
      </div>
    ) : "";
    return (
      <div>
        {showNav}
        <Menu onStateChange={isMenuOpen} right isOpen={isOpen} width={ 400 }>
          <div id="cd-cart">
            {showList}
          </div>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: state.openMenu
  }
}

export default connect({mapStateToProps})(CartMenu);
