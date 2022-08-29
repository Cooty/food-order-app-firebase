import { useRef, useState } from "react";
import { isEmpty, isLengthX } from "../../utils/validators";
import classes from "./Checkout.module.css";

function Checkout(props) {
    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const confirmHandler = (e) => {
        e.preventDefault();
        const isNameValid = !isEmpty(nameRef.current.value);
        const isStreetValid = !isEmpty(streetRef.current.value);
        const isPostalCodeValid = isLengthX(postalRef.current.value, 5);
        const isCityValid = !isEmpty(cityRef.current.value);

        setFormInputsValidity({
            name: isNameValid,
            street: isStreetValid,
            city: isCityValid,
            postalCode: isPostalCodeValid,
        });

        if (isNameValid && isStreetValid && isPostalCodeValid && isCityValid) {
            props.onConfirm({
                name: nameRef.current.value,
                street: streetRef.current.value,
                postalCode: postalRef.current.value,
                city: cityRef.current.value,
            });
        } else {
            return;
        }
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div
                className={`${classes.control} ${
                    !formInputsValidity.name && classes.invalid
                }`}
            >
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameRef} />
                {!formInputsValidity.name && <p>Please give your name!</p>}
            </div>
            <div
                className={`${classes.control} ${
                    !formInputsValidity.street && classes.invalid
                }`}
            >
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetRef} />
                {!formInputsValidity.street && (
                    <p>Please give a street name!</p>
                )}
            </div>
            <div
                className={`${classes.control} ${
                    !formInputsValidity.postalCode && classes.invalid
                }`}
            >
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalRef} />
                {!formInputsValidity.postalCode && (
                    <p>Please give a postal code!</p>
                )}
            </div>
            <div
                className={`${classes.control} ${
                    !formInputsValidity.city && classes.invalid
                }`}
            >
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityRef} />
                {!formInputsValidity.city && <p>Please give a city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;
