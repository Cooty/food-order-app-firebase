import { useContext, useState, useEffect } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../../../Cart/CartIcon";
import CartContext from "../../../../store/cart-context";

function HeaderCartButton(props) {
    const cartContext = useContext(CartContext);
    const numberOfCartItems = cartContext.items.reduce(
        (currentNumber, item) => currentNumber + item.amount,
        0
    );
    const [isButtonAnimated, setIsButtonAnimated] = useState(false);
    const buttonClasses = `${styles.button}${
        isButtonAnimated ? " " + styles.bump : ""
    }`;
    useEffect(() => {
        if (numberOfCartItems === 0) {
            return;
        }
        setIsButtonAnimated(true);
    }, [numberOfCartItems]);

    return (
        <button
            type="button"
            className={buttonClasses}
            onClick={props.onClick}
            onAnimationEnd={() => {
                setIsButtonAnimated(false);
            }}
        >
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>{props.label}</span>
            {numberOfCartItems !== 0 && (
                <span className={styles.badge}>{numberOfCartItems}</span>
            )}
        </button>
    );
}

export default HeaderCartButton;
