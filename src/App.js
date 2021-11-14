import React, { useState } from 'react'

import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import CartProvider from './Store/CartProvider';

function App() {

  const [cartVisible, setCartVisible] = useState(false)

  const showCartHandler = () => {
    setCartVisible(true)
  }

  const hideCartHandler = () => {
    setCartVisible(false)
  }

  return (
    <CartProvider>
      {cartVisible && <Cart hideCart={hideCartHandler} />}
      <Header showCart={showCartHandler}/>
      <main>
        <Meals/> 
      </main>
    </CartProvider>
  );
}

export default App;
