import { useContext, useState } from 'react'
import CartContext from '../../Store/cart-context'

import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {
    const [showCheckOut, setShowCheckOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)

    const hasItems = cartCtx.items.length > 0

    const cartItemRemove = id => {
        cartCtx.removeItem(id)

    }


    const cartItemAdd = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }


    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://mealsorder-8a023-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartItems = <ul className={classes['cart-items']}> {
        cartCtx.items.map(item => {
            return <CartItem name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemove.bind(null, item.id)} onAdd={cartItemAdd.bind(null, item)} />
        })}</ul>




    const modal = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.hideCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={() => { setShowCheckOut(true) }}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
            </div>
            {showCheckOut && <Checkout onConfirm={submitOrderHandler} onClose={props.hideCart} />}
            {!showCheckOut && modal}
        </>
    )

    const isSubmittingContent = <p>Sending order data...</p>

    const didSubmitModalContent = 
    <>
        <p>Succesfully send the order!</p>
        <button className={classes.button} onClick={props.hideCart}>Close</button>
    </>

    return (
        <Modal onClick={props.hideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart