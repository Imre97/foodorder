import { useRef, useState } from 'react'

import classes from './Checkout.module.css';

const isEmpty = value => value.trim().length == ''
const isNoteFourCharts = value => value.trim().length !== 4

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        address: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef()
    const addressInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value
    const enteredAddress = addressInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredAddressIsValid = !isEmpty(enteredAddress)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalCodeIsValid = !isNoteFourCharts(enteredPostalCode)


    setFormInputValidity({
        name: enteredNameIsValid,
        address: enteredAddressIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
    })


    const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredCityIsValid && enteredPostalCode

    if(!formIsValid) {
      return
    }

    props.onConfirm({
        name: enteredName,
        address: enteredAddress,
        postalCode: enteredPostalCode,
        city: enteredCity
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ? "" : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.address ? "" : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={addressInputRef}/>
        {!formInputValidity.address && <p>Please enter a valid address!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city ? "" : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;