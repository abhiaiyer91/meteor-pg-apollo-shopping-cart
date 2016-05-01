import React from 'react';
import CartMenu from '/imports/client/components/CartMenu';
import { openMenu } from '/imports/client/actions/openMenu';

export default function Navbar({ ...rest }) {
  return (
    <header id="cart-menu" {...rest}>
      <CartMenu />
    </header>
  );
}
