import React from 'react'; 
import { connect } from 'react-redux';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { ReactComponent as ShoppingCart } from '../../assets/11.1 shopping-bag.svg'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingCart className='shopping-icon' />
        <span className='item-count'> { itemCount } </span>
    </div>
)

const mapDispatchStateToProp = dispatch => ({
    toggleCartHidden: user => dispatch(toggleCartHidden()) 
})
  
const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchStateToProp)(CartIcon); 