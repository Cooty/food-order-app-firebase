import { useContext, useState } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import formatPrice from "../../utils/format-price";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";
import { API_URL } from "../../config/api";

function Cart(props) {
    const cartContext = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);
    const cartItemAddHandler = (item) => {
        cartContext.addItem(item);
    };
    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };
    const cartItems = cartContext.items.map(({ name, id, price, amount }) => (
        <CartItem
            key={id}
            name={name}
            price={price}
            amount={amount}
            onAdd={() => {
                cartItemAddHandler({ name, id, price, amount: 1 });
            }}
            onRemove={() => {
                cartItemRemoveHandler(id);
            }}
        />
    ));
    const orderHandler = () => {
        setIsOrderFormVisible(true);
    };

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch(`${API_URL}/orders.json`, {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartContext.items,
            }),
        }).finally(() => {
            setIsSubmitting(false);
            setDidSubmit(true);
            cartContext.clearCart();
        });
    };

    const ModalActions = () => (
        <div className={styles.actions}>
            <button
                type="button"
                className={styles["button--alt"]}
                onClick={props.onHide}
            >
                Close
            </button>
            {cartContext.items.length !== 0 && (
                <button
                    type="button"
                    className={styles["button"]}
                    onClick={orderHandler}
                >
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <>
            <ul className={styles["cart-items"]}>{cartItems}</ul>
            <div className={styles.total}>
                <span>Total amount:</span>
                <span>{formatPrice(cartContext.totalAmount)}</span>
            </div>
            {isOrderFormVisible ? (
                <Checkout
                    onCancel={props.onHide}
                    onConfirm={submitOrderHandler}
                />
            ) : (
                <ModalActions />
            )}
        </>
    );

    const loadingModalContent = <p>Sending your order...</p>;
    const didSubmitModalContent = <p>Order sent!</p>;

    return (
        <Modal onBackdropClick={props.onHide}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && loadingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;
