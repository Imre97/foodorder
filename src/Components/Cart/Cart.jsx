import { useContext } from 'react'
import CartContext from '../../Store/cart-context'

import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'

const Cart = props => {
    const cartCtx = useContext(CartContext)

    const hasItems = cartCtx.items.length > 0

    const cartItemRemove = id => {} 
    const cartItemAdd = item => {} 


    const cartItems = <ul className={classes['cart-items']}> {
    cartCtx.items.map(item => {
        return <CartItem name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemove.bind(null, item.id)} onAdd={cartItemAdd.bind(null, item)} />
    })}</ul>

    return(
        <Modal onClick={props.hideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.hideCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart