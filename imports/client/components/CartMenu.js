import React from 'react';
import BurgerMenu from 'react-burger-menu';
import { closeMenu, openMenu } from '/imports/client/actions/openMenu';
import { connect } from 'react-redux';

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
    const isMenuOpen = function(state) {
      if (!state.isOpen) {
        dispatch(closeMenu());
      }
    };
    return (
      <div>
        {showNav}
        <Menu onStateChange={isMenuOpen} right isOpen={isOpen} width={ 400 }>
          <div id="cd-cart">
            <h2>Cart <a style={{float: "right", cursor: "pointer"}} onClick={function (e) {
            e.preventDefault();
            return dispatch(closeMenu());
          }}>Close</a></h2>

            <ul className="cd-cart-items">
              <li>
                <span className="cd-qty">1x</span> Product Name
                <div className="cd-price">$9.99</div>
                <a href="#0" className="cd-item-remove cd-img-replace">Remove</a>
              </li>

              <li>
                <span className="cd-qty">2x</span> Product Name
                <div className="cd-price">$19.98</div>
                <a href="#0" className="cd-item-remove cd-img-replace">Remove</a>
              </li>

              <li>
                <span className="cd-qty">1x</span> Product Name
                <div className="cd-price">$9.99</div>
                <a href="#0" className="cd-item-remove cd-img-replace">Remove</a>
              </li>
            </ul>

            <div className="cd-cart-total">
              <p>Total <span>$39.96</span></p>
            </div>

            <a href="#0" className="checkout-btn">Checkout</a>
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

export default connect(mapStateToProps)(CartMenu);
