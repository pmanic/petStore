import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartItemsState, removeFromCart } from '../redux/cartSlice';
import PetItem from '../components/petsList/petItem';

/**
 * React component for displaying the shopping cart.
 * @component
 */
const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(cartItemsState);

    /**
     * Removes an item from the shopping cart.
     * @param {string} itemId - The ID of the item to be removed.
     * @memberof Cart
     * @inner
     */
    const removeItemFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    /**
     * Calculates the total price of items in the shopping cart.
     * @returns {number} The total price.
     * @memberof Cart
     * @inner
     */
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div className="cart__wrapper page-layout">
            <div className="cart__header">
                <h1 className="cart__title">Your Cart</h1>
                <p className="cart__title">Total: ${calculateTotalPrice().toFixed(2)}</p>
            </div>
            {cartItems.length > 0 ? (
                <div className="cart__content">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart__link">
                            <PetItem data={item} typeOfPage={'cart'} />
                            <button className='btn btn--inverse' onClick={() => removeItemFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No pets currently in cart.</p>
            )}
        </div>
    );
};

export default Cart;
