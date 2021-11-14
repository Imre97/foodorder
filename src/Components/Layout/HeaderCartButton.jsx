import { useContext, useEffect, useState } from 'react'

import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../Store/cart-context'

const HeaderCartButton = props => {
    const [btnIshightlighted, setBtnIsHighlighted] =useState(false)

    const cartCtx = useContext(CartContext)

    const {items} = cartCtx

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)


    const btnClasses = `${classes.button} ${btnIshightlighted ? classes.bump : ""}`

    useEffect(() => {
        if(cartCtx.items.length === 0) {
            return
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton