import React from 'react'; 
import { connect } from 'react-redux';
import { ReactComponent as ShoppingCart } from '../../assets/11.1 shopping-bag.svg'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingCart className='shopping-icon' />
        <span className='item-count'> 0 </span>
    </div>
)

const mapDispatchStateToProp = dispatch => ({
    toggleCartHidden: user => dispatch(toggleCartHidden()) 
})
  

export default connect(null, mapDispatchStateToProp)(CartIcon); 